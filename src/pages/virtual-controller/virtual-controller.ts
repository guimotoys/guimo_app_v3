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
  public virtualCtrl: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public plt:Platform) {
    
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad VirtualControllerPage');
    
    this.plt.ready().then(() =>{
        this.virtualCtrl = nipplejs;
        this.virtualCtrl = nipplejs.create({
        zone: document.getElementById('dynamic'),
        mode: 'static',
        position:{top:'30%',left:'30%'},
        color:'white'
      });

      this.virtualCtrl.on('move',(evt, nipple)=>{
        setTimeout( () =>{
          console.log('after 250ms');
          console.log('Angle->',nipple.angle)
          console.log('Force', nipple.force);
        },250)
        
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

}
