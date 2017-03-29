import { ConfigPage } from './../config/config';
import { Component } from '@angular/core';

import { NavController, Events, LoadingController, FabContainer, AlertController } from 'ionic-angular';
//import { trigger, state, style,animate,transition } from '@angular/animations';
import { Guimo } from './../../providers/guimo';
import { PlatformCheck } from './../../providers/platform-check';
//*,import { MainButtonComponent } from './../../components/main-button/main-button';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isAndroid: boolean = this.plt.isAndroid();
  btStatus: boolean = this.guimo.checkBtEnabled();
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
    private backMode: BackgroundMode) {

      this.events.subscribe('bt:status',(btStatus)=>{
          this.btStatus = btStatus;
      });

      this.backMode.enable();

  }

  ionViewDidLoad(){
    this.localNotifications.hasPermission().then( res =>{
      console.log('LocalNotif HasPermission: ',res);
      if(!res){
        this.localNotifications.registerPermission().then(resp => {
          console.log('LocalNotif permission Register', resp);
        });
      }
    });
  }
  
  openPage(p, fab?: FabContainer){
    if(p === 'config'){
      fab.close();
      this.navCtrl.push(ConfigPage);
    }
  }

  connectBtAndroid(fab?:FabContainer){
    fab.close();
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
      this.guimo.connectAndroidWp(this.guimo.deviceAndroid.address).map(res => res.json()).subscribe(data =>{
        load.dismiss();
        console.log('data->', data);  
      }, err =>{
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
  }

}
