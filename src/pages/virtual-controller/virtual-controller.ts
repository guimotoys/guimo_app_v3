import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
declare var nipplejs: any;

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
  public virtualCtrl: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public plt:Platform,private scr:ScreenOrientation) {
    
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
        this.virtualCtrl = nipplejs;
        this.virtualCtrl = nipplejs.create({
        zone: document.getElementById('dynamic'),
        mode: 'static',
        position:{top:'50%',left:'35%'},
        color:'white'
      });

      this.virtualCtrl.on('move',(evt, nipple)=>{
        setTimeout( () =>{
          //this.force = nipple.force.toFixed(2);
          this.force = Math.round(this.map_range(nipple.force.toFixed(2),0,1,100,255));
          this.angle = Math.round(nipple.angle.degree);
          this.direction = nipple.direction.angle;
          console.log(nipple);

        },350);
        
      });
    })

    /*this.virtualCtrl.on('added', (evt, nipple)=>{
        nipple.on('start',(evt)=>{
          console.log('joystick pressed', evt);
        });

        nipple.on('plain:up', (evt) => {
          console.log('event', evt);
        })
    })*/

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

}
