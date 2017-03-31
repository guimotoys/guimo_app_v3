import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { Guimo } from './../../providers/guimo';

/*
  Generated class for the HomeTips component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'home-tips',
  templateUrl: 'home-tips.html'
})
export class HomeTipsComponent {

   btStatus: boolean = this.guimo.btStatus;
   btConnected: boolean;
 

  constructor(private guimo:Guimo, private events:Events) {
    this.events.subscribe('bt:status',(btStatus)=>{
          this.btStatus = btStatus;
      });
  }

  ionViewWillEnter(){
    this.events.subscribe('bt:Connected',(res)=>{
      this.btConnected =  res;
    });
  }

}
