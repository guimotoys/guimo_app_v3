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
  private cheatCount = 0;
  arrayBtHelper = 0;
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
    this.cheatCount = 0;
    this.plt.ready().then(res => {

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('Screen Orientation ' + this.screenOrientation.ORIENTATIONS.PORTRAIT);
      });

      this.guimo.checkBtEnabled().then((data) => {
        this.btStatus = true;
        this.searchConnectPaired();
      }).catch((err) => {
        this.guimo.enableBt().then((data) => {
          this.btStatus = true;
          this.searchConnectPaired();
        }).catch((err) => {
          console.log('BtEnableErr', err);
        });
      });

      this.isAndroid = this.plt.isAndroid();
      if (this.isAndroid) {
        /* this.guimoDb.getDeviceSelectedAndroid().then(result => {
           this.guimo.deviceAndroid = result.rows.item(0);
         }).catch(err => {
           this.guimo.deviceAndroid = { address: null, class: null, id: null, name: null };
           console.log(err);
         });*/
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

  private searchConnectUnpaired() {
    console.log('searchConnectUnpaired');
    this.guimo.listUnpaired().then((devices) => {
      console.log('unpairedDev', devices);
      if (devices.length <= 0) {
        this.searchConnectPaired();
      } else {
        this.tryConnectUnpaired(devices);
      }
    }).catch((err) => {
      console.log('unpaired error', err);
    });

  }

  private tryConnectUnpaired(devices: any) {
    if (this.arrayBtHelper < devices.length) {
      this.connectRoutine(devices, 'unpaired');
    } else {
      this.arrayBtHelper = 0;
      this.searchConnectPaired();
    }
  }

  private searchConnectPaired() {
    console.log('searchConnectPaired');
    this.guimo.listDevices().then((devices) => {
      console.log('pairedDev', devices);
      if (devices.length <= 0) {
        this.searchConnectUnpaired();
      } else {
        this.tryConnectPaired(devices);
      }
    }).catch((err) => {
      console.log('paired error', err);
    });
  }

  tryConnectPaired(devices: any) {
    if (this.arrayBtHelper < devices.length) {
      console.log('tryConnectIf', this.arrayBtHelper, devices.length)
      this.connectRoutine(devices, "paired");
    } else {

      this.arrayBtHelper = 0;
      this.searchConnectUnpaired();
    }
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
      this.searchConnectPaired();
    }
  }

  private connectRoutine(devices: any, typeCon: string) {
    let findGuimo = false;
    this.connectAttempts++;
    let device = devices[this.arrayBtHelper];
    if (this.guimo.checkRegex(device.name) && device.name != undefined) {
      this.guimo.connectAndroidWp(device.address).subscribe(data => {
        findGuimo = true;
        console.log('conectou em ', device.name);
        this.btIsConnected = true;
        this.btStatus = true;
        this.guimo.btConnected = this.btIsConnected;
        this.guimo.btStatus = this.btStatus;
        this.guimo.subscribe("\n").subscribe((bdata) => {
          console.log(JSON.stringify(bdata));
          if (bdata == "desmontado\r\n") {
            this.events.publish("guimo:nave", false);
          }
          if (bdata == "nave\r\n") {
            this.events.publish("guimo:nave", true);
          }
          if(bdata == "continue\r\n"){
            this.events.publish("guimo:continue",true);
          }

          if(bdata == "sensorD\r\n"){
            this.events.publish('guimo:if', 'sensord');
          }
          if(bdata == "sensorE\r\n"){
            this.events.publish('guimo:if', 'sensore');
          }
          if(bdata == "ambos\r\n"){
            this.events.publish('guimo:if', 'ambos');
          }
          if(bdata == "nenhum\r\n"){
            this.events.publish('guimo:if', 'nenhum');
          }
        });
        setTimeout(() => {
          if (this.cheatCount < 5) {
            this.navCtrl.setRoot(HomePage);
          }
        }, 1000);

      }, err => {
        this.arrayBtHelper++;
        console.log('ErroBt->',err);
        this.guimo.btConnected = false;
        //Precisa de um tempo pra começar dnv
        if (this.cheatCount < 5 && this.guimo.btConnected) {
          this.navCtrl.setRoot(HomePage);
        }
        setTimeout(() => {
          if (typeCon == "paired" && this.guimo.btConnected != true) {
            console.log('entrou paired');
            this.tryConnectPaired(devices);
          }
          if (typeCon == "unpaired" && this.guimo.btConnected != true) {
            console.log('entrou unpaired');
            this.tryConnectUnpaired(devices);
          }
        }, 1000);
      });
    } else {
      this.arrayBtHelper++;
      setTimeout(() => {
        if (typeCon == "paired") {
          console.log('entrou paired');
          this.tryConnectPaired(devices);
        }
        if (typeCon == "unpaired") {
          console.log('entrou unpaired');
          this.tryConnectUnpaired(devices);
        }
      }, 1500);
    }
  }

  goToMenu() {
    this.cheatCount++;
    if (this.cheatCount >= 5) {
      this.guimo.btConnected = true;
      this.guimo.btStatus = true;
      this.navCtrl.setRoot(HomePage);

    }
  }

}
