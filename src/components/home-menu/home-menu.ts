import { Guimo } from './../../providers/guimo';
import { App, NavController, Platform, Events } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

import { ConversationPage } from './../../pages/conversation/conversation';
import { BlocksPage } from './../../pages/blocks/blocks';
import { ConfigPage } from './../../pages/config/config';
import { FoodsPage } from './../../pages/foods/foods';
import { JokenpoPage } from './../../pages/jokenpo/jokenpo';
import { MissionsPage } from './../../pages/missions/missions';
import { ScreenChangePage } from './../../pages/screen-change/screen-change';
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
    btConnected: boolean = this.guimo.btConnected;
    menuOptions = this.guimo.menuOptions;

  constructor(
    public app: App, 
    public plt: Platform,
    public guimo: Guimo,
    private evts:Events) {
      this.nav = this.app.getActiveNav();
  }

  ngOnInit(){
    this.btStatus = this.guimo.btStatus;
    this.btConnected = this.guimo.btConnected;
    this.evts.subscribe('bt:Connected',(cnt)=>{
      this.btConnected = cnt;
      console.log('home-menu btcon',this.btConnected);
    });
    this.evts.subscribe('bt:status',(sts)=>{
      this.btStatus = sts;
      console.log('home-menu btstatus',this.btConnected);
    });

    this.evts.subscribe('menu:Options',(sts)=>{
      console.log('menuOptions', sts);
      this.menuOptions = sts;
    });
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

      if(p == "jokenpo"){
        this.nav.push(JokenpoPage);
      }

      if(p == "missions"){
        this.nav.push(MissionsPage);
      }
  }
}
