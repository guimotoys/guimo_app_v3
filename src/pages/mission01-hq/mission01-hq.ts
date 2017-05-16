import { Mission01Page } from './../mission01/mission01';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Mission01Hq page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mission01-hq',
  templateUrl: 'mission01-hq.html'
})
export class Mission01HqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mission01HqPage');
  }

  goToMission(){
    this.navCtrl.push(Mission01Page);
  }
}
