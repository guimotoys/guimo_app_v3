import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
//declare var VirtualJoystick: any;
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
  force: any = 0;
  angle: any = 0;
  direction: any = "";
  interval: any = null;
  isDisabled: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    private scr: ScreenOrientation,
    private blt: BluetoothSerial,
    private media: MediaPlugin) {

  }

  ionViewWillLoad() {
    this.plt.ready().then(() => {
      this.scr.lock(this.scr.ORIENTATIONS.LANDSCAPE);


    });
  }

  ionViewWillLeave() {
    this.scr.lock(this.scr.ORIENTATIONS.PORTRAIT);
    //clearInterval(this.interval);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VirtualControllerPage');
  }

  sendMov(cmd: string) {
    console.log(this.isDisabled);
    if (!this.isDisabled) {
      this.isDisabled = true;
      setTimeout(() => {
        this.blt.write(cmd).then(() => {
          setTimeout(() => {
            console.log('disabled button');
            this.isDisabled = false;
          }, 150);
        });
      }, 500);
    }

  }

  buzinar() {
    const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/carhornx.mp3',
      (status) => console.log(status),
      () => console.log('Action is successful.'),
      (error) => console.error(error.message));

    setTimeout(() => {
      file.play();
    }, 400);

    setTimeout(() => {
      file.release();
    }, 2300);
  }

}
