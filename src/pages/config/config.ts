import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';


/*
  Generated class for the Config page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {
  btDevice: any;
  devices: any;
  btStatus: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private bluetoothSerial: BluetoothSerial) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
    this.bluetoothSerial.isEnabled().then((res)=>{
      this.btStatus = true;
      console.log('Status->', this.btStatus);
    }).catch((err)=>{
      console.log('Erro:', err);
      this.btStatus = false;
    })
  }


  searchDevices(){
      //this.bluetoothSerial.
  }

  enableBT(){
    this.bluetoothSerial.enable().then(()=>{
      this.btStatus = true;
    });
  }


}
