import { BtConnectPage } from './../bt-connect/bt-connect';
import { PlatformCheck } from './../../providers/platform-check';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/*
  Generated class for the HqHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hq-home',
  templateUrl: 'hq-home.html'
})
export class HqHomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private plt: PlatformCheck) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HqHomePage');
     this.plt.ready().then( res =>{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then( () =>{
        console.log('Screen Orientation '+this.screenOrientation.ORIENTATIONS.PORTRAIT);
      });
     });
  }

  goToHome(){
    this.navCtrl.setRoot(BtConnectPage);

  }

}
