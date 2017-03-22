import { ConfigPage } from './../config/config';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//*,import { MainButtonComponent } from './../../components/main-button/main-button';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }
  
  openPage(p){
    if(p === 'config'){
      this.navCtrl.push(ConfigPage);
    }
  }

}
