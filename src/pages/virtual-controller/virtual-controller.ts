import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
declare var VirtualJoystick: any;
/*
  Generated class for the VirtualController page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-virtual-controller',
  templateUrl: 'virtual-controller.html'
})
export class VirtualControllerPage {
  force:any = 0;
  angle: any = 0;
  direction: any = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public plt:Platform,
    private scr:ScreenOrientation,
    private blt:BluetoothSerial) {
    
  }

  ionViewWillLoad(){
    this.plt.ready().then(()=>{
      this.scr.lock(this.scr.ORIENTATIONS.LANDSCAPE);
    })
  }

  ionViewWillLeave(){
    this.scr.lock(this.scr.ORIENTATIONS.PORTRAIT);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad VirtualControllerPage');
    
    this.plt.ready().then(() =>{
      var joystick = new VirtualJoystick({
         container: document.getElementById('dynamic'),
         stationaryBase	: true,
         baseX		: 200,
         baseY		: 200
      });

      setInterval(()=>{
        if(joystick.right()){
          this.blt.write('r\n');
        }

        if(joystick.left()){
          this.blt.write('l\n');
        }

        if(joystick.up()){
          this.blt.write('f\n');
        }

        if(joystick.down()){
          this.blt.write('b\n');
        }

      },260);
    });

  }

  /**
   * Map rage function 
   * @param value value to map
   * @param low1 lower range that value is
   * @param high1 higher ranger that value is
   * @param low2 lower range that value will be
   * @param high2 higher range tha value will be
   */
  map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  sleepSendBt():Promise<any>{
    return new Promise((resolve)=>setTimeout(resolve,360));    
  }
}
