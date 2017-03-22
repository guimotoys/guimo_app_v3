import { ConfigPage } from './../config/config';
import { Component } from '@angular/core';

import { NavController,Events } from 'ionic-angular';
import { Guimo } from './../../providers/guimo';

//*,import { MainButtonComponent } from './../../components/main-button/main-button';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  btStatus: boolean = this.guimo.checkBtEnabled();
  constructor(public navCtrl: NavController, public guimo: Guimo, public events: Events) {
    this.events.subscribe('bt:status',(btStatus)=>{
        this.btStatus = btStatus;
    });
  }
  
  openPage(p){
    if(p === 'config'){
      this.navCtrl.push(ConfigPage);
    }
  }

  ionViewWillEnter(){
  }

}
