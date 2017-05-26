import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Guimo } from './../../providers/guimo';
import { GuimoDb } from './../../providers/guimo-db';

/*
  Generated class for the Secret page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-secret',
  templateUrl: 'secret.html'
})
export class SecretPage {
  feedback:string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private guimo: Guimo,
    private guimoDb: GuimoDb,
    private events:Events) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecretPage');

  }

  btSet(param){
    this.guimo.btStatus = param;
    this.guimo.btConnected = param;
    this.feedback = "Bluetooth liberado";

  }

  setFood(param){
      this.events.publish('guimo:food',param);
      this.feedback = 'Comida setada para '+param;
  }

  setHealth(param){
    this.events.publish('guimo:health',param);
    this.feedback = 'Saúde setada para '+param;
  }

  openMissions(){
    this.guimoDb.openMissions().then(()=>{
      console.log('openMissions');
      this.feedback = 'Missões abertas';
      }).catch(err =>{console.log(err)});
  }

  closeMissions(){
    this.guimoDb.resetMissions().then(()=>{
      console.log('closeMissions');
      this.feedback = 'Missões fechadas';
      }).catch(err =>{console.log(err)});
  }

}
