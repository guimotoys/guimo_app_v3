import { Mission03Page } from './../mission03/mission03';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Mission03HqPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mission03-hq',
  templateUrl: 'mission03-hq.html',
})
export class Mission03HqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mission03HqPage');
  }

  goToMission(){
    this.navCtrl.push(Mission03Page);
  }

  

}
