import { Component } from '@angular/core';
import { NavController, NavParams,AlertController} from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/*
  Generated class for the Mission02 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mission02',
  templateUrl: 'mission02.html'
})
export class Mission02Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private screenOrientation: ScreenOrientation) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mission02Page');

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(()=>{
      console.log('Orientation Locked in '+this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }).catch( err =>{
      console.log(err);
    });
  }

}
