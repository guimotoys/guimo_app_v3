import { Guimo } from './../../providers/guimo';
import { Component, OnInit } from '@angular/core';
import { Events, Platform } from 'ionic-angular';

/*
  Generated class for the FooterBar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'footer-bar',
  templateUrl: 'footer-bar.html'
})
export class FooterBarComponent  implements OnInit{

  foodStatus: number = this.guimo.food;
  energyStatus: number = this.guimo.energy;
  healthStatus: number = this.guimo.health;

  constructor(public guimo:Guimo, private events:Events,private plt:Platform) {
      
  }

  ngOnInit(){

    this.plt.ready().then( () => {
      this.guimo.checkFoodStatus();
        this.events.subscribe('guimo:food',(food)=>{
          this.foodStatus = food;
        });      
    });
    
  }

}
