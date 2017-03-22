import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/*
  Generated class for the Guimo provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Guimo {

  private _btStatus: boolean;
  private _deviceAndroid: any = {address:null,class:null, id:null, name:null};
  public devices: Array<any> = [];
  constructor(public http: Http, public bluetoothSerial: BluetoothSerial, public events: Events) {
  
  }

  get btStatus():boolean {
    return this._btStatus;
  }

  set btStatus(status: boolean){
    this._btStatus = status;
  }

  get deviceAndroid(){
    return this._deviceAndroid;
  }

  set deviceAndroid(device){
    this._deviceAndroid = device;
  }

  public checkBtEnabled(): boolean{
    
    this.bluetoothSerial.isEnabled().then((res)=>{
      this.btStatus = true;
      this.events.publish('bt:status',this.btStatus);
    }).catch((err)=>{
      this.btStatus = false;
      this.events.publish('bt:status',this.btStatus);
    });

    return this.btStatus;
  }

  public enableBt() {
    this.bluetoothSerial.enable().then(()=>{
      this.btStatus = true;
      this.events.publish('bt:status',this.btStatus);
    }).catch(()=>{
      this.btStatus = false;
      this.events.publish('bt:status',this.btStatus);
    });
  }

  public listDevices(){
    this.bluetoothSerial.list().then(res=>{
      this.devices = res;
      this.events.publish('bt:listDevices',this.devices);
      return this.devices;
    });
  }

  public connectAndroidWp(macAddres:string){
    this.bluetoothSerial.connect(macAddres).map(res => res.json()).subscribe(data =>{
      console.log(data);
    });
  }

  public connectIos(uuidAddress:string){
    this.bluetoothSerial.connect(uuidAddress).map(res => res.json()).subscribe(data =>{
      console.log(data);
    });
  }

}
