import { Nav} from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

/*
  Generated class for the MainButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'main-button',
  templateUrl: 'main-button.html'
})
export class MainButtonComponent {
  
  @ViewChild(Nav) navCtrl: Nav;
  constructor() {
    console.log('Hello MainButton Component');
  }

}
