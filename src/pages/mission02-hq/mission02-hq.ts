import { Mission02Page } from './../mission02/mission02';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Mission02Hq page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mission02-hq',
  templateUrl: 'mission02-hq.html'
})
export class Mission02HqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mission02HqPage');
  }

  goToMission(){
    this.navCtrl.push(Mission02Page);
  }

}
