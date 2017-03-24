import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { Guimo } from './../../providers/guimo';
import { PlatformCheck } from './../../providers/platform-check';

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
  isAndroid: boolean = this.plt.isAndroid();
  isIos: boolean = this.plt.isIos();
  isWp: boolean = this.plt.isWindows();
  btStatus: boolean = this.guimo.checkBtEnabled();
  btConnected: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private bluetoothSerial: BluetoothSerial,
              private guimo: Guimo,
              private plt:PlatformCheck,
              public events:Events) 
      {
        
      this.events.subscribe('bt:listDevices',(btDevices)=>{
        this.btDevices = btDevices;
        this.searching = false;
        this.btDevice = this.btDevices[0];
      });

      this.events.subscribe('bt:status',(btStatus)=>{
        this.btStatus = btStatus;
      });
                
    }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter(){
    this.guimo.checkBtConnected().then(res => {
      this.btConnected = res;
      console.log(this.btConnected);
    });

    if(this.isAndroid){
      this.btDevice = this.guimo.deviceAndroid;
    }

    if(this.isWp){
      
    }

    if(this.isIos){
      
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
