import { Mission02HqPage } from './../mission02-hq/mission02-hq';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Mission01HqPage } from './../mission01-hq/mission01-hq';
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
  }

}
