import { ConfigPage } from './../config/config';
import { Component } from '@angular/core';

import { NavController, Events, LoadingController, FabContainer } from 'ionic-angular';
import { Guimo } from './../../providers/guimo';
import { PlatformCheck } from './../../providers/platform-check';

//*,import { MainButtonComponent } from './../../components/main-button/main-button';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  btStatus: boolean = this.guimo.checkBtEnabled();
  btConnected: boolean;
  isAndroid: boolean = this.plt.isAndroid();
  btConnectErr: boolean = false;
  btConnectErrMsg: string = "";
  
  constructor(
    public navCtrl: NavController, 
    public guimo: Guimo, 
    public events: Events, 
    private plt: PlatformCheck,
    private loadCtrl: LoadingController) {
      this.events.subscribe('bt:status',(btStatus)=>{
          this.btStatus = btStatus;
      });
  }
  
  openPage(p, fab?: FabContainer){
    if(p === 'config'){
      fab.close();
      this.navCtrl.push(ConfigPage);
    }
  }

  ionViewWillEnter(){
    this.guimo.checkBtConnected().then( res => this.btConnected = res);
  }

  connectBtAndroid(){
    let load = this.loadCtrl.create({
      spinner: 'crescent',
      content: 'Tentando conectar com o  <strong>'+this.guimo.deviceAndroid.name+'</strong> ...',
    });
    load.present();
    this.guimo.connectAndroidWp(this.guimo.deviceAndroid.address).map(res => res.json()).subscribe(data =>{
      load.dismiss();
      console.log('data->', data);  
    }, err =>{
      load.dismiss();
      this.btConnectErr = true;
      this.btConnectErrMsg = err;
      console.log('err-> ',err);
    });
  }

}
