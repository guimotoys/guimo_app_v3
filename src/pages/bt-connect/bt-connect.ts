import { HomePage } from './../home/home';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GuimoDb } from './../../providers/guimo-db';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PlatformCheck } from './../../providers/platform-check';
import { Guimo } from './../../providers/guimo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the BtConnectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bt-connect',
  templateUrl: 'bt-connect.html',
})
export class BtConnectPage {
  isAndroid: boolean = this.plt.isAndroid();
  connectAttempts: number = 0;
  btStatus: boolean;
  btIsConnected: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public guimo: Guimo,
    public events: Events,
    private plt: PlatformCheck,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
    private backMode: BackgroundMode,
    private guimoDb: GuimoDb,
    private screenOrientation: ScreenOrientation) {

  }

  ionViewDidLoad() {
    this.plt.ready().then(res => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('Screen Orientation ' + this.screenOrientation.ORIENTATIONS.PORTRAIT);
      });

      this.guimoDb.resetMissions().then(() => {
        //console.log('missoes resetadas');
      });

      this.guimo.checkBtEnabled().then((data) => {
        this.btStatus = true;
        this.connectBtAndroid();
      }).catch((err) => {
        this.guimo.enableBt().then((data) => {
          this.btStatus = true;
          this.connectBtAndroid();
        }).catch((err) => {
          console.log('BtEnableErr', err);
        });
      });

      this.isAndroid = this.plt.isAndroid();
      if (this.isAndroid) {
        this.guimoDb.getDeviceSelectedAndroid().then(result => {
          this.guimo.deviceAndroid = result.rows.item(0);
        }).catch(err => {
          this.guimo.deviceAndroid = { address: null, class: null, id: null, name: null };
          console.log(err);
        });
      }

      this.localNotifications.hasPermission().then(res => {
        console.log('LocalNotif HasPermission: ', res);
        if (!res) {
          this.localNotifications.registerPermission().then(resp => {
            console.log('LocalNotif permission Register', resp);
          });
        }
      });
    });
  }

   private tryConnectUnpaired() {
    this.guimo.listUnpaired().then((devices) => {
      if (devices.length <= 0) {
        this.tryConnectUnpaired();
      } else {
        this.connectRoutine(devices);
      }
    }).catch((err) => {
      console.log('paired error', err);
    });
  }

  private tryConnectPaired() {
    this.guimo.listDevices().then((devices) => {
      if (devices.length <= 0) {
        setTimeout(() => {
          this.tryConnectUnpaired();
        }, 2000)

      } else {
        this.connectRoutine(devices);
      }
    }).catch((err) => {
      console.log('unpaired error', err);
    });
  }

  connectBtAndroid() {
    if (this.guimo.btConnected) {
      let alert = this.alertCtrl.create({
        title: 'Algo deu Errado :(',
        message: "Você já está conectado a outro dispositivo",
        buttons: ['OK']
      });
      alert.present();
    } else {

      this.tryConnectPaired();
    }
  }

  private connectRoutine(devices: any) {
    let findGuimo = false;
    if (devices.length <= 0) {
      this.connectAttempts++;
      this.tryConnectUnpaired();
    } else {
      devices.forEach(device => {
        if (!findGuimo && this.guimo.checkRegex(device.name)) {
          console.log("Device name:" + device.name + " - regex_>" + this.guimo.checkRegex(device.name) + "\n");
          findGuimo = true;
          this.guimo.deviceAndroid = device;
          this.guimo.connectAndroidWp(this.guimo.deviceAndroid.address).subscribe(data => {
            console.log('Conectou em '+device.name);
            this.btIsConnected = true;
            this.btStatus = true;
            this.guimo.btConnected = this.btIsConnected;
            this.guimo.btStatus = this.btStatus;
            //this.guimo.defaultConnection();
            this.guimo.subscribe("\n").subscribe((bdata) => {
              console.log(JSON.stringify(bdata));
              if (bdata == "desmontado\r\n") {
                this.events.publish("guimo:nave", true);
              }
              if (bdata == "nave\r\n") {
                this.events.publish("guimo:nave", false);
              }
            });
            setTimeout(()=>{
              this.navCtrl.setRoot(HomePage);
            },500);
          }, err => {
            console.log(err);
            this.btIsConnected = false;
            this.guimo.btConnected = this.btIsConnected;
            this.events.publish('bt:Connected', this.btIsConnected);
            setTimeout(() => {
              let alert = this.alertCtrl.create({
                title: 'Algo deu Errado :(',
                message: 'Não foi possivel conectar ao dispositivo ' + this.guimo.deviceAndroid.name,
                buttons: ['OK']
              });
              alert.present();
            }, 500);
          });
        }
      });
      if (!findGuimo) {
        this.tryConnectUnpaired();
      }
    }
  }

}
