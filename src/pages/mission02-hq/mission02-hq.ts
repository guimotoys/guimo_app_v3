import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Mission02Page } from './../mission02/mission02';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
/*
  Generated class for the Mission02Hq page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mission02-hq',
  templateUrl: 'mission02-hq.html'
})
export class Mission02HqPage {
  @ViewChild(Slides) slides: Slides;
  //Variavel pra controlar se pode passar o slide. Se true, não pode, se false, pode
  slideToNext: boolean;
  interval: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    private evt: Events,
    private blt: BluetoothSerial) {
    this.interval = setInterval(() => {
      this.blt.write("corpo\n").then(() => {
        console.log('enviou corpo');
      })
    }, 2000);


    /**Inscreve no evento guimo:nave pra receber status do corpo */
    this.evt.subscribe("guimo:nave", (data) => {
      this.slideToNext = data;
      if (data) {
        let alt = this.alert.create({
          title: 'Legal!!',
          message: 'Agora que você montou a nave, pode continuar a história!!',
          buttons: ['Ok']
        });
        clearInterval(this.interval);
        setTimeout(() => {
          alt.present().then(() => {
            this.slides.lockSwipeToNext(false);
          });
        }, 1500);
      }

    });
  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
  }

  goToMission() {
    clearInterval(this.interval);
    this.navCtrl.push(Mission02Page);
  }

  countSlides() {
    let currentIndex = this.slides.getActiveIndex();
    console.log(this.slideToNext, currentIndex);

    if (this.slideToNext == false) {
      if (currentIndex == 5) {
        this.slides.lockSwipeToNext(true);
        let alt = this.alert.create({
          title: " Monte a nave",
          message: " Agora você precisa montar a nave para continuar!",
          buttons: ["Ok"]
        });

        setTimeout(() => {
          if (this.slideToNext == false) {
            alt.present();
          }
        }, 800);

      } else {
        this.slides.lockSwipeToNext(false);
      }
    }

  }

}
