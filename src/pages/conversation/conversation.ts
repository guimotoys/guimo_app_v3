import { Guimo } from './../../providers/guimo';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Conversation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
export class ConversationPage {
  awsering:boolean = false;
  screen = this.guimo.activeScreen;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private blt: BluetoothSerial,
              private guimo: Guimo) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  talk(min:number, max:number){
    this.awsering = true;
    let rand = Math.floor(Math.random() * (max - min +1)) + min;
    let str = rand+"\n";
    /*if(this.guimo.btConnected){
      
    }*/
    this.blt.write(str).then(()=>{
      console.log('enviou '+str);
      setTimeout(()=>{
        this.awsering = false;
        this.blt.write(this.guimo.activeScreen);
      },5000);
    }).catch(()=>{
      setTimeout(()=>{
        this.awsering = false;
        this.blt.write(this.guimo.activeScreen);
      },5000);
    });

  }

}
