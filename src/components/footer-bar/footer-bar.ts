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

  constructor(private guimo:Guimo, private events:Events,private plt:Platform) {
      
  }

  ngOnInit(){
    this.plt.ready().then( () => {
      this.guimo.checkEnergyStatus().subscribe((edata) => {
        console.log('energy Footerbar', edata);
        this.energyStatus = edata; 
      });
      this.guimo.checkFoodStatus().subscribe( (fdata) => {
        console.log('food FooterBar', fdata);  
        this.foodStatus = fdata;
      });
      this.guimo.checkHealthStatus().subscribe((hdata) => {
        console.log('health FooterBar', hdata);
        this.healthStatus = hdata;
      });
    });
    
  }

}
