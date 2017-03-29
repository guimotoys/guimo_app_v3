import { Observable } from 'rxjs/Rx';
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
  private _btConnected: boolean;
  private _deviceAndroid: any = {address:null,class:null, id:null, name:null};
  private _health: number = 100;
  private _energy: number = 100;
  private _food: number = 100;
  public devices: Array<any> = [];
  constructor(public http: Http, public bluetoothSerial: BluetoothSerial, public events: Events) {
  
  }

  /**
   * return enable/disabled btStatus
   */
  get btStatus():boolean {
    return this._btStatus;
  }

  /**
   * Set BtStatus
   */
  set btStatus(status: boolean){
    this._btStatus = status;
  }

  /**
   * return deviceAndroid object
   */
  get deviceAndroid(){
    return this._deviceAndroid;
  }

  /**
   * Set deviceAndroid object
   */
  set deviceAndroid(device){
    this._deviceAndroid = device;
  }

  /**
   * return btConnected status
   */
  get btConnected(): boolean{
    return this._btConnected;
  }

  /**
   * set btConnected status
   */
  set btConnected(btConnected){
    this._btConnected = btConnected;
  }

  get health(){
    return this._health;
  }

  set health(h:number){
    this._health = h;
  }

  get energy(){
    return this._energy;
  }

  set energy(e: number){
    this._energy = e;
  }

  get food(){
    return this._food;
  }

  set food(f:number){
    this._food = f;
  }

  public checkFoodStatus():Observable<number>{
    return Observable.create( obs => {
       /*setInterval(()=>{
        obs.next(this.food);
        obs.complete();
       },1000);*/
       setInterval( () =>{
         if(this.food > 0){
            this.food -= 1;
         }else{
           this.food = 0;
         }
        obs.next(this.food);
      }, 15000);
      
    });
  }

  public checkEnergyStatus(): Observable<number>{
    return Observable.create( obs =>{
      setInterval( () =>{
        if(this.energy > 0){
          this.energy -= 1;
        }else{
          this.energy = 0;
        }
        obs.next(this.energy);
      }, 10000);
    });
  }

  public checkHealthStatus(): Observable<number>{
    return Observable.create( obs =>{
      setInterval( () =>{
        if(this.health > 0 ){
          this.health -= 1;
        }else{
          this.health = 0;
        }
        obs.next(this.health);
      }, 25000);
    });
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

  public checkBtConnected(): Promise<boolean> {
    return this.bluetoothSerial.isConnected().then(res =>{
      this.btConnected = true;
      return this.btConnected;
    },(err)=>{
      this.btConnected = false;
      return this.btConnected;
      
    })
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

  public connectAndroidWp(macAddres:string): Observable<any>{
    return this.bluetoothSerial.connect(macAddres);
  }

  public connectIos(uuidAddress:string){
    this.bluetoothSerial.connect(uuidAddress).map(res => res.json()).subscribe(data =>{
      console.log(data);
    })
  }

}
