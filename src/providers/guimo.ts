import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LocalNotifications } from '@ionic-native/local-notifications';


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
  public foodNotif:boolean = false;
  public energyNotif: boolean = false;
  public healthNotif: boolean = false;
  public devices: Array<any> = [];
  constructor(
    public http: Http, 
    public bluetoothSerial: BluetoothSerial, 
    public events: Events,
    private platform:Platform,
    private localNotifications: LocalNotifications) {
      this.platform.ready().then(()=>{

        this.localNotifications.on('click', ()=>{
          this.localNotifications.isScheduled(1).then( res => {
            this.localNotifications.cancel(1);
            this.foodNotif = false;
          });
          this.localNotifications.isScheduled(2).then( res => {
            this.localNotifications.cancel(2);
            this.foodNotif = false;
          });
          this.localNotifications.isScheduled(3).then( res => {
            this.localNotifications.cancel(3);
            this.foodNotif = false;
          });
        });

        this.localNotifications.on('clear', ()=>{
          this.localNotifications.isScheduled(1).then( res => {
            this.localNotifications.cancel(1);
            this.foodNotif = false;
          });
          this.localNotifications.isScheduled(2).then( res => {
            this.localNotifications.cancel(2);
            this.foodNotif = false;
          });
          this.localNotifications.isScheduled(3).then( res => {
            this.localNotifications.cancel(3);
            this.foodNotif = false;
          });
        });
      });

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
    this.events.publish('bt:status',status);
    console.log('btStatus->',status);
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
    this.events.publish('bt:Connected',btConnected);
    this._btConnected = btConnected;
  }

  /**
   * get Guimo Health
   */
  get health(){
    return this._health;
  }

  /**
   * set Guimo Health
   */
  set health(h:number){
    this._health = h;
  }

  /**
   * get Guimo Energy
   */
  get energy(){
    return this._energy;
  }

  /**
   * set Guimo Energy
   */
  set energy(e: number){
    this._energy = e;
  }

  /**
   * get Guimo Food
   */
  get food(){
    return this._food;
  }

  /**
   * set Guimo Food
   */
  set food(f:number){
    this._food = f;
  }

  /**
   * Check Food Status of Guimo
   * return Observable<number>
   */
  public checkFoodStatus():Observable<number>{
    return Observable.create( obs => {
       setInterval( () =>{
         if(this.food > 0){
            this.food -= 1;
         }else{
           this.food = 0;
         }
         console.log('foodNotif ',this.foodNotif);
         if( (this.food <= 20 && this.food % 5 == 0 && !this.foodNotif && this.food > 0) ){
           
            this.localNotifications.schedule({
              id: 1,
              title:'Guimo',
              text: 'Guimo está com fome',
              icon: 'res://icon_stat_logo_guimo_alternativa',
              smallIcon: 'res://ic_stat_logo_guimo_alternativa',
              led: '0000FF'
            });
            this.foodNotif = true;
         }
        obs.next(this.food);
      }, 15000);
      
    });
  }

 /**
  * check Guimo Energy Status
  * return Observable<number>
  */
  public checkEnergyStatus(): Observable<number>{
    return Observable.create( obs =>{
      setInterval( () =>{
        if(this.energy > 0){
          this.energy -= 1;
        }else{
          this.energy = 0;
        }

        if( (this.energy <= 20 && this.energy % 5 == 0 && !this.energyNotif && this.energy > 0) ){
           
            this.localNotifications.schedule({
              id: 2,
              title:'Guimo',
              text: 'Guimo está sem energia',
              icon: 'res://icon_stat_logo_guimo_alternativa',
              smallIcon: 'res://ic_stat_logo_guimo_alternativa',
              led: '0000FF'
            });
            this.energyNotif = true;
         }
        obs.next(this.energy);
      }, 20000);
    });
  }

  /**
   * check Guimo Health Status
   * return Observable<number>
   */
  public checkHealthStatus(): Observable<number>{
    return Observable.create( obs =>{
      setInterval( () =>{
        if(this.health > 0 ){
          this.health -= 1;
        }else{
          this.health = 0;
        }

        if((this.health <= 20 && this.health % 5 == 0 && !this.healthNotif && this.health > 0)){
            this.localNotifications.schedule({
              id: 3,
              title:'Guimo',
              text: 'Guimo não está se sentindo bem!',
              icon: 'res://icon_stat_logo_guimo_alternativa',
              smallIcon: 'res://ic_stat_logo_guimo_alternativa',
              led: '0000FF'
            });
            this.healthNotif = true;
         }
        obs.next(this.health);
      }, 25000);
    });
  }

  /**
   * Check if Bt is enabled
   */
  public checkBtEnabled(): void{
    
    this.bluetoothSerial.isEnabled().then((res)=>{
      this.btStatus = true;
    }).catch((err)=>{
      this.btStatus = false;
    });
    
  }

  /**
   * check if Bt is Connected
   */
  public checkBtConnected(): void {
    this.bluetoothSerial.isConnected().then(res =>{
      this.btConnected = true;
    },(err)=>{
      this.btConnected = false;
    });
  }

  /**
   * Enable Bt
   */
  public enableBt() {
    this.bluetoothSerial.enable().then(()=>{
      this.btStatus = true;
      this.events.publish('bt:status',this.btStatus);
    }).catch(()=>{
      this.btStatus = false;
      this.events.publish('bt:status',this.btStatus);
    });
  }

  /**
   * List Paired devices
   */
  public listDevices(){
    this.bluetoothSerial.list().then(res=>{
      this.devices = res;
      this.events.publish('bt:listDevices',this.devices);
    });
  }

  /**
   * connect to Device in Android or Windows Phone
   * @param macAddres the MacAddress of device
   */
  public connectAndroidWp(macAddres:string): Observable<any>{
    return this.bluetoothSerial.connect(macAddres)
  }

  /**
   * connect to Device in iOS;
   * @param uuidAddress the UUIDAddress of Device
   */
  public connectIos(uuidAddress:string){
    this.bluetoothSerial.connect(uuidAddress).map(res => res.json()).subscribe(data =>{
      console.log(data);
    })
  }

}
