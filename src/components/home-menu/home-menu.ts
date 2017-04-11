import { App, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { ConfigPage } from './../../pages/config/config';
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
  

  constructor(public app: App) {
      this.nav = this.app.getActiveNav();
  }


  openPage(p: string){
      this.nav = this.app.getActiveNav();
      if(p === "config"){
         this.nav.push(ConfigPage); 
      }
  }
}
