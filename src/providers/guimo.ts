//import { StatusBar } from '@ionic-native/status-bar';
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
  public static readonly SCREEN_DEFAULT = "padrao\n";
  public static readonly SCREEN_HUNGRY = "fome\n";
  public static readonly SCREEN_SICK = "doente\n";
  public static readonly SCREEN_ROBOT = "robo\n";
  public static readonly SCREEN_GIRL = "menina\n";
  public static readonly SCREEN_MUSTACHE = "bigode\n";
  public static readonly SCREEN_GLASSES = "oculos\n";
  public static readonly SCREEN_INVERSE = "inverso\n";
  public static readonly SCREEN_TONGUE = "lingua\n";
  public static readonly SCREEN_CURE = "remedio\n";
  public static readonly SCREEN_CARE = "carinho\n";
  public static readonly SCREEN_BURGER = "lanche\n";
  public static readonly SCREEN_APPLE = "maca\n";
  public static readonly SCREEN_SODA = "refri\n";
  public static readonly SCREEN_JUICE = "suco\n";
  public static readonly SCREEN_FRIES = "batata\n";
  public static readonly SCREEN_ICECREAM = "sorvete\n";
  public static readonly SCREEN_HOTDOG = "hotdog\n";

  private _btStatus: boolean;
  private _btConnected: boolean;
  private _deviceAndroid: any = {address:null,class:null, id:null, name:null};
  private _health: number = 100;
  private _energy: number = 100;
  private _food: number = 100;
  private _activeScreen: string = Guimo.SCREEN_DEFAULT;
  private _menuOptions:boolean = false;
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


  set activeScreen(screen: string){
    this._activeScreen = screen;
  }

  get activeScreen():string {
    return this._activeScreen;
  }

  set menuOptions(opt){
    this.events.publish('menu:Options',opt);
    this._menuOptions = opt; 
  }

  get menuOptions():boolean{
    return this._menuOptions;
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
  set btConnected(btConnected: boolean){
    this._btConnected = btConnected;
    this.events.publish('bt:Connected',btConnected);
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
  public checkFoodStatus(){
      var foodInteraval = setInterval(()=>{
        if(this.btConnected){
          this.food--;
        }
          this.events.publish('guimo:food',this.food);

          if( (this.food < 20 && this.health > 25 && this.activeScreen != Guimo.SCREEN_HUNGRY)){
            this.activeScreen = Guimo.SCREEN_HUNGRY;
            this.bluetoothSerial.write(this.activeScreen);
          }
          if(this.food == 0){
            clearInterval(foodInteraval);
            /*var secondInterval = setInterval(()=>{
              this.food--;
              this.events.publish('guimo:food',this.food);
              if(this.food == 50){
                clearInterval(secondInterval);
              }
            },2000);*/
          }
        }, 206000);  
  }

 /**
  * check Guimo Energy Status
  * return Observable<number>
  */
  public checkEnergyStatus(){
   var energyInterval = setInterval(()=>{
      if(this.btConnected){
        this.energy--;
      }
        this.events.publish('guimo:energy',this.energy);
        if(this.energy == 0){
          clearInterval(energyInterval);
          /*var secondInterval = setInterval(()=>{
            this.food--;
            this.events.publish('guimo:food',this.food);
            if(this.food == 50){
              clearInterval(secondInterval);
            }
          },2000);*/
        }
      }, 207000);  
  }

  /**
   * check Guimo Health Status
   * return Observable<number>
   */
  public checkHealthStatus(){
    var healthInterval = setInterval(()=>{
      if(this.btConnected){
        this.health--;
      }
        this.events.publish('guimo:health',this.health);
        if(this.health == 0){
          clearInterval(healthInterval);
          console.log('cancelou intervalo saude')
          /*var secondInterval = setInterval(()=>{
            this.food--;
            this.events.publish('guimo:food',this.food);
            if(this.food == 50){
              clearInterval(secondInterval);
            }
          },2000);*/
        }
      }, 210000);  
  }

  /**
   * Check if Bt is enabled
   */
  public checkBtEnabled(): Promise<any>{
    return this.bluetoothSerial.isEnabled();
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
  public enableBt():Promise<any> {
    return this.bluetoothSerial.enable();
  }

  /**
   * List Paired devices
   */
  public listDevices():Promise<any>{
    return this.bluetoothSerial.list();
  }

  /**
   * connect to Device in Android or Windows Phone
   * @param macAddres the MacAddress of device
   */
  public connectAndroidWp(macAddres:string): Observable<any>{
    return this.bluetoothSerial.connect(macAddres)
  }

  public subscribe(delimiter:string): Observable<any>{
    return this.bluetoothSerial.subscribe(delimiter);
  }

  public listUnpaired():Promise<any>{
    return this.bluetoothSerial.discoverUnpaired();
  }

  public checkRegex(s:string):boolean{
    let regEx = new RegExp("(guimo)[0-9a-zA-Z]*");
    return regEx.test(s);
  }
  public defaultConnection(){
    if(this.food < 20 && this.health >= 25){
      this.activeScreen = Guimo.SCREEN_HUNGRY;
    }

    if(this.food < 20 && this.health < 25){
      this.activeScreen = Guimo.SCREEN_SICK;
    }

    if(this.food > 20 && this. health >= 25){
      this.activeScreen = Guimo.SCREEN_DEFAULT;
    }
    this.bluetoothSerial.write(this.activeScreen);
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

  public addFood(qtd){
    this.food += qtd;
    if(this.food > 100){
      this.food = 100;
    }
    this.events.publish('guimo:food',this.food);
  }

  public addHealth(qtd){
    this.health += qtd;
    console.log(this.health);
    if(this.health > 100){
      this.health = 100;
    }

    if(this.health <= 0){
      this.health = 0;
    };
    this.events.publish('guimo:health',this.health);
  }

}
