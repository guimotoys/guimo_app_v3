import { ConfigPage } from './../config/config';
import { Component } from '@angular/core';

import { NavController, Events, LoadingController, FabContainer, AlertController } from 'ionic-angular';
//import { trigger, state, style,animate,transition } from '@angular/animations';
import { Guimo } from './../../providers/guimo';
import { GuimoDb } from './../../providers/guimo-db';
import { PlatformCheck } from './../../providers/platform-check';
//*,import { MainButtonComponent } from './../../components/main-button/main-button';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then( () =>{
      console.log('Screen Orientation '+this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
    
    this.plt.ready().then( res =>{
      
      this.guimo.checkBtEnabled();
      this.isAndroid = this.plt.isAndroid();

      if(this.isAndroid){
        this.guimoDb.getDeviceSelectedAndroid().then(result =>{
          this.guimo.deviceAndroid = result.rows.item(0);
          console.log('devwillLoad->',this.guimo.deviceAndroid);
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
  }

  /**
   * Conect on Bt Device in Android
   * @param fab fab button to close
   */
  connectBtAndroid(fab?:FabContainer){
    fab.close();
    this.guimo.checkBtEnabled();
    if(this.guimo.checkBtEnabled){
        if(this.guimo.deviceAndroid.address == null){
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
            //this.guimo.checkEnergyStatus();
          }, err =>{
            console.log(err);
            load.dismiss();
            this.btConnectErr = true;
            this.btConnectErrMsg = err;
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
      let alert = this.alertCtrl.create({
            title:'Algo deu Errado :(',
            message: 'Seu Bluetooth não está ligado, por favor, ligue antes de conectar ao Guimo!',
            buttons:['OK']
          });
          alert.present();
    }
  }

}
