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
   slideToNext:boolean = true;
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public alert: AlertController,
      private evt: Events,
      private blt: BluetoothSerial) {}

  ionViewDidLoad() {
    let interval = setInterval(()=>{
      this.blt.write("corpo\n").then(()=>{
        console.log('enviou corpo');
      }) 
    },4000);

    
    this.evt.subscribe("guimo:nave",(data)=>{
      this.slideToNext = data;
      console.log('guimoNave->',data);
      if(!data){
        let alt = this.alert.create({
          title: 'Legal!!',
          message: 'Agora que você montou a nave, pode continuar a história!!',
          buttons:['Ok']
        });
        clearInterval(interval);
        setTimeout(()=>{
          alt.present().then(()=>{
            this.slideToNext = false;
            this.slides.lockSwipeToNext(false);
          });
        },1500)
        
      }
          
    });
  }

  goToMission(){
    this.navCtrl.push(Mission02Page);
  }

  countSlides(){
    console.log(this.slides.getActiveIndex());
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex == 4 ){
      this.slides.lockSwipeToNext(true);
      let alt = this.alert.create({
        title:" Monte a nave",
        message: " Agora você já pode montar a nave!",
        buttons: ["Ok"]
      });

      setTimeout(()=>{alt.present();},1500)
      

    }
  }

}
