import { Guimo } from './../../providers/guimo';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform,Events } from 'ionic-angular';

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
  btDevice: any = {address:null,class:null, id:null, name:null};
  public btDevices: Array<any> = [];
  searching: boolean = false;
  isAndroid: boolean = false;
  isIos: boolean = false;
  isWp: boolean = false;
  btStatus: boolean = this.guimo.checkBtEnabled();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private bluetoothSerial: BluetoothSerial,
              private guimo: Guimo,
              private plt:Platform,
              public events:Events) 
      {
        
      this.events.subscribe('bt:listDevices',(btDevices)=>{
        this.btDevices = btDevices;
        this.searching = false;
      });

      this.events.subscribe('bt:status',(btStatus)=>{
        this.btStatus = btStatus;
      });
                
    }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter(){
    
    if(this.plt.is('android')){
      this.btDevice = this.guimo.deviceAndroid;
      this.isAndroid = true;
      
    }

    if(this.plt.is('windows')){
      this.isWp = true;
    }

    if(this.plt.is('iphone') || this.plt.is('ipad')){
      this.isIos = true;
    }

    this.btStatus = this.guimo.checkBtEnabled();

  }


  searchDevices(){
    this.searching = true;
    this.guimo.listDevices();
    
  }

  toggleChange(evt){
    if(evt._checked && !this.btStatus){
        this.guimo.enableBt();
    }
  }

  saveSelectedAndroid(evt){
    this.guimo.deviceAndroid = this.btDevice;
  }
  

}
