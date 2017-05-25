import { Component } from '@angular/core';

import { NavController, Events, LoadingController, FabContainer, AlertController } from 'ionic-angular';

import { Guimo } from './../../providers/guimo';
import { GuimoDb } from './../../providers/guimo-db';
import { PlatformCheck } from './../../providers/platform-check';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { SecretPage } from './../secret/secret';
import { ConfigPage } from './../config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isAndroid: boolean = this.plt.isAndroid();
  btStatus: boolean = this.guimo.btStatus;
  btConnected: boolean;
  btConnectErr: boolean = false;
  btConnectErrMsg: string = "";
  private secretCount: number = 0;
  
  constructor(
    public navCtrl: NavController, 
    public guimo: Guimo, 
    public events: Events, 
    private plt: PlatformCheck,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
    private backMode: BackgroundMode,
    private guimoDb: GuimoDb,
    private screenOrientation: ScreenOrientation) {

      this.events.subscribe('bt:status',(btStatus)=>{
          this.btStatus = btStatus;
      });
      this.backMode.enable();
      
  }

  /**
   * Executes When View was loaded
   */
  ionViewDidLoad(){
    
    this.plt.ready().then( res =>{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then( () =>{
        console.log('Screen Orientation '+this.screenOrientation.ORIENTATIONS.PORTRAIT);
      });

      this.guimoDb.resetMissions().then(()=>{
        console.log('missoes resetadas');
      });

      this.events.subscribe('bt:status',(btStatus)=>{
          this.btStatus = btStatus;
      });

      this.backMode.enable();

      this.guimo.checkBtEnabled();
      this.isAndroid = this.plt.isAndroid();

      if(this.isAndroid){
        this.guimoDb.getDeviceSelectedAndroid().then(result =>{
          this.guimo.deviceAndroid = result.rows.item(0);
          //console.log('devwillLoad->',this.guimo.deviceAndroid);
        }).catch(err =>{
          console.log(err);
        });
      }

      this.localNotifications.hasPermission().then( res =>{
        console.log('LocalNotif HasPermission: ',res);
        if(!res){
          this.localNotifications.registerPermission().then(resp => {
            console.log('LocalNotif permission Register', resp);
          });
        }
      });
      
    });
  }

  /**
   * Open an Page
   * @param p 
   * @param fab 
   */
  openPage(p, fab?: FabContainer){
    if(p === 'config'){
      fab.close();
      this.navCtrl.push(ConfigPage);
    }

    if(p === 'easteregg'){
      this.navCtrl.push(SecretPage);
    }
  }

  easterEgg(){
    this.secretCount++
    if(this.secretCount >= 5){
      console.log(this.secretCount);
      this.secretCount = 0;
      this.openPage('easteregg');
    }
  }

  /**
   * Conect on Bt Device in Android
   * @param fab fab button to close
   */
  connectBtAndroid(fab?:FabContainer){
    fab.close();
    this.guimo.checkBtEnabled();
    if(this.guimo.checkBtEnabled){
        if(this.guimo.deviceAndroid == undefined){
          this.btConnectErr = true;
          this.btConnectErrMsg = "Você não selecionou um dispotivo para se conectar no Menu de configurações. Acesse ele através do botão superior"
          let alert = this.alertCtrl.create({
            title:'Algo deu Errado :(',
            message: this.btConnectErrMsg,
            buttons:['OK']
          });
          alert.present();
        }else{
          let load = this.loadCtrl.create({
            spinner: 'crescent',
            content: 'Tentando conectar com o  <strong>'+this.guimo.deviceAndroid.name+'</strong>...',
          });
          load.present();
          this.guimo.connectAndroidWp(this.guimo.deviceAndroid.address).subscribe(data =>{
            load.dismiss();
            this.btConnected = this.guimo.btConnected = true;
            this.guimo.btStatus = true;
            //this.guimo.defaultConnection();
            this.events.publish('bt:Connected',this.btConnected);
            this.guimo.subscribe("\n").subscribe((bdata)=>{
              console.log(JSON.stringify(bdata));
              if(bdata == "desmontado\r\n"){
                this.events.publish("guimo:nave",true);
              }
              if(bdata == "nave\r\n"){
                this.events.publish("guimo:nave",false);
              }
            });
            //this.guimo.checkEnergyStatus();
          }, err =>{
            console.log(err);
            load.dismiss();
            this.btConnectErr = true;
            this.btConnectErrMsg = err;
            this.btConnected = this.guimo.btConnected = false;
            this.events.publish('bt:Connected',this.btConnected);
            setTimeout(()=>{
              let alert = this.alertCtrl.create({
                title:'Algo deu Errado :(',
                message: 'Não foi possivel conectar ao dispositivo '+this.guimo.deviceAndroid.name,
                buttons:['OK']
              });
              alert.present();
          }, 500);
        });
      }
    }else{
      this.btConnected = this.guimo.btConnected = false;
      this.events.publish('bt:Connected',this.btConnected);
      let alert = this.alertCtrl.create({
            title:'Algo deu Errado :(',
            message: 'Seu Bluetooth não está ligado ou o Guimo foi desconectado :(',
            buttons:['OK']
          });
          alert.present();
    }
  }

}
