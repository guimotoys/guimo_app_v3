import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QrTestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qr-test',
  templateUrl: 'qr-test.html',
})
export class QrTestPage {
  qrResult: {format:string, cancelled: boolean, text:string} = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qr: BarcodeScanner) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrTestPage');
  }

  scan() {
    this.qr.scan({resultDisplayDuration:0}).then((data)=>{
      this.qrResult = data;
    },(error)=>{
      console.log('error', error);
    })
  }

}
