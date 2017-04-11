import { Guimo } from './../../providers/guimo';
import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

/*
  Generated class for the FooterBar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'footer-bar',
  templateUrl: 'footer-bar.html'
})
export class FooterBarComponent {

  foodStatus: number = this.guimo.food;
  energyStatus: number = this.guimo.energy;
  healthStatus: number = this.guimo.health;
  constructor(private guimo:Guimo, private events:Events) {

    this.events.subscribe('bt:Connected', (res) => {
        if(res){
          this.guimo.checkEnergyStatus().subscribe( data => this.energyStatus = data );
          this.guimo.checkFoodStatus().subscribe( data => this.foodStatus = data);
          this.guimo.checkHealthStatus().subscribe( data => this.healthStatus = data);
        }
    });

  }

}
