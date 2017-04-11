import { Guimo } from './../../providers/guimo';
import { App, NavController, Platform } from 'ionic-angular';
import { Component } from '@angular/core';

import { ConfigPage } from './../../pages/config/config';
import { VirtualControllerPage } from './../../pages/virtual-controller/virtual-controller';
/*
  Generated class for the HomeMenu component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'home-menu',
  templateUrl: 'home-menu.html'
})
export class HomeMenuComponent {
    private nav: NavController;
    btStatus: boolean = this.guimo.btStatus;
    btConnected: boolean;

  constructor(
    public app: App, 
    public plt: Platform,
    public guimo: Guimo) {
      this.nav = this.app.getActiveNav();
  }

  ionViewWillEnter(){
    this.btStatus = this.guimo.btStatus;
    this.btConnected = this.guimo.btConnected;
  }

  openPage(p: string){
      this.nav = this.app.getActiveNav();
      if(p === "config"){
         this.nav.push(ConfigPage); 
      }

      if(p === "virtual-controller"){
        this.nav.push(VirtualControllerPage);
      }
  }
}
