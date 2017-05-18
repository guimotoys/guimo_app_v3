import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Mission01HqPage } from './../mission01-hq/mission01-hq';
import { Mission02HqPage } from './../mission02-hq/mission02-hq';
import { Mission03HqPage } from './../mission03-hq/mission03-hq';
import { SecretPage } from './../secret/secret';
import { GuimoDb } from './../../providers/guimo-db';

/*
  Generated class for the Missions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-missions',
  templateUrl: 'missions.html'
})
export class MissionsPage {
  secretCount = 0;
  missions:Array<any> = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private guimoDb: GuimoDb) {}

  ionViewDidLoad() {

  }

  ionViewWillEnter(){
    this.missions = [];
    this.guimoDb.getMissions().then((result)=>{
      for(var i = 0; i < result.rows.length; i++){
        this.missions.push(result.rows.item(i));
      }

    });
  }

  loadMissions(m){
    if(m == 1){
      this.navCtrl.push(Mission01HqPage);
    }

    if(m == 2){
      this.navCtrl.push(Mission02HqPage);
    }

    if(m == 3){
      this.navCtrl.push(Mission03HqPage);
    }
  }

  easterEgg(){
    this.secretCount++
    if(this.secretCount >= 5){
      console.log(this.secretCount);
      this.secretCount = 0;
      this.navCtrl.push(SecretPage);
    }
  }

}
