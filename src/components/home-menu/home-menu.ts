import { ScreenChangePage } from './../../pages/screen-change/screen-change';
import { Guimo } from './../../providers/guimo';
import { App, NavController, Platform} from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

import { ConversationPage } from './../../pages/conversation/conversation';
import { BlocksPage } from './../../pages/blocks/blocks';
import { ConfigPage } from './../../pages/config/config';
import { FoodsPage } from './../../pages/foods/foods';
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
export class HomeMenuComponent implements OnInit{
    private nav: NavController;
    btStatus: boolean = this.guimo.btStatus;
    btConnected: boolean;

  constructor(
    public app: App, 
    public plt: Platform,
    public guimo: Guimo) {
      this.nav = this.app.getActiveNav();
  }

  ngOnInit(){
    this.btStatus = this.guimo.btStatus;
    this.btConnected = this.guimo.btConnected;
  }

  openPage(p: string){
      this.nav = this.app.getActiveNav();
      if(p === "foods"){
        this.nav.push(FoodsPage);
      }

      if(p === "config"){
         this.nav.push(ConfigPage); 
      }


      if(p === "blocks"){
        this.nav.push(BlocksPage);
      }

      if(p === "virtual-controller"){
        this.nav.push(VirtualControllerPage);

      }

      if(p === "conversation"){
        this.nav.push(ConversationPage);
      }

      if(p == "screens"){
        this.nav.push(ScreenChangePage);
      }
  }
}
