import { Component, OnInit, Input } from '@angular/core';
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
export class HomeTipsComponent implements OnInit{

   @Input() attempts:number;
   btStatus: boolean = this.guimo.btStatus;
   btConnected: boolean;
 

  constructor(private guimo:Guimo, private events:Events) {
    this.events.subscribe('bt:Connected',(res)=>{
      this.btConnected =  res;
      console.log('home-tips btcon',this.btConnected);
    });

    this.events.subscribe('bt:status',(res)=>{
      this.btStatus =  res;
      console.log('home-tips btsstats',this.btConnected);
    });
  }

  /**
   * Executes when view will be Loaded
   */
  ngOnInit(){
    
  }

}
