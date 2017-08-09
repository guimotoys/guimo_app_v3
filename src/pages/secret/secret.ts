import { BtConnectPage } from './../bt-connect/bt-connect';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
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
  feedback: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private guimo: Guimo,
    private guimoDb: GuimoDb,
    private events: Events,
    private blt: BluetoothSerial) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecretPage');

  }

  testarBLE(){
    this.blt.write('c').then(result =>{
      console.log('TesteBLE->', result );
    });
  }
  connectAgain(){
    this.guimo.btConnected = false;
    this.navCtrl.setRoot(BtConnectPage);
  }

  btSet(param) {
    this.guimo.btStatus = param;
    this.guimo.btConnected = param;
    this.feedback = "Bluetooth liberado";

  }

  setFood(param) {
    if(param <= 10){
      this.guimo.activeScreen = Guimo.SCREEN_HUNGRY;
      this.blt.write(Guimo.SCREEN_HUNGRY);
    }else{
      this.guimo.activeScreen = Guimo.SCREEN_DEFAULT;
      this.blt.write(Guimo.SCREEN_DEFAULT);
    }
    this.guimo.food = param;
    this.events.publish('guimo:food', param);
    this.feedback = 'Comida setada para ' + param;
  }

  setHealth(param) {
    if(param <= 10){
      this.guimo.activeScreen = Guimo.SCREEN_SICK;
      this.blt.write(Guimo.SCREEN_SICK);
    }else{
      this.guimo.activeScreen = Guimo.SCREEN_DEFAULT;
      this.blt.write(Guimo.SCREEN_DEFAULT);
    }
    this.events.publish('guimo:health', param);
    this.feedback = 'Saúde setada para ' + param;
  }

  openMissions(mission) {
    this.guimo.activeScreen = Guimo.SCREEN_SICK;
    this.blt.write(this.guimo.activeScreen);
    
    this.guimoDb.updateMissions(mission,1);
  }

  closeMissions(mission) {
    this.guimoDb.updateMissions(mission,0);
  }

  openAllMenu() {
    this.guimo.menuOptions = true;
  }

  closeAllMenu() {
    this.guimo.menuOptions = false;
  }

}
