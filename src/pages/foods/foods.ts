import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';

import { GuimoDb } from './../../providers/guimo-db';
import { Guimo } from './../../providers/guimo';
import { PlatformCheck } from './../../providers/platform-check';
import { MediaPlugin, MediaObject } from '@ionic-native/media';


/*
  Generated class for the Foods page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-foods',
  templateUrl: 'foods.html'
})
export class FoodsPage {
  foods: Array<any> = [];
  foodStatus: number = this.guimo.food;
  healthStatus: number = this.guimo.health;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private plt: PlatformCheck,
    private guimoDb: GuimoDb,
    private guimo:Guimo,
    private blt: BluetoothSerial,
    private toast:ToastController,
    private scr:ScreenOrientation,
    private events:Events,
    private media: MediaPlugin) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodsPage');

    this.plt.ready().then(()=>{
      this.scr.lock(this.scr.ORIENTATIONS.LANDSCAPE);
        this.guimoDb.getFoods().then((result)=>{
          for(var i = 0; i < result.rows.length; i++){
            this.foods.push(result.rows.item(i));
          }
        }); 
        this.events.subscribe('guimo:food',(food)=>{
          this.foodStatus = food;
        });

        this.events.subscribe('guimo:health',(health)=>{
          this.healthStatus = health;
        });
    })
  }

  ionViewWillLeave(){
    this.scr.lock(this.scr.ORIENTATIONS.PORTRAIT);
  }

  like(id:number, index:number){
   this.foods[index].status = 1;
   this.guimoDb.updateFoodStatus(id,this.foods[index].status);
  }

  unlike(id:number, index: number){
    this.foods[index].status = -1;
    this.guimoDb.updateFoodStatus(id,this.foods[index].status);
  }

  resetStatus(id:number, index:number){
    this.foods[index].status = 0;
    this.guimoDb.updateFoodStatus(id,this.foods[index].status);
  }

  giveFood(id:number){
    if(this.guimo.food <= 0){
      this.guimo.checkFoodStatus();
    }

    if(this.guimo.food < 100){
      if(id == 1){
        this.blt.write(Guimo.SCREEN_FRIES);
        this.guimo.addFood(8);
        this.guimo.addHealth(-5);
          const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/Bite3.mp3', (status) => console.log(status), () => console.log('Action is successful.'), (error) => console.error(error.message));
          setTimeout(()=>{
            file.play();
          },1000);

          setTimeout(()=>{
            file.play();
          },1700);
          
          setTimeout(()=>{
            file.stop();
            file.release();
          },2300);
      }

      if(id == 2){
        this.blt.write(Guimo.SCREEN_HOTDOG);
        this.guimo.addFood(10);
        this.guimo.addHealth(-6);
        const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/Bite3.mp3', (status) => console.log(status), () => console.log('Action is successful.'), (error) => console.error(error.message));
          setTimeout(()=>{
            file.play();
          },1000);

          setTimeout(()=>{
            file.play();
          },1700);
          
          setTimeout(()=>{
            file.stop();
            file.release();
          },2300);
      }

      if(id == 3){
        this.blt.write(Guimo.SCREEN_BURGER);
        this.guimo.addFood(20);
        this.guimo.addHealth(-10)
        const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/Bite3.mp3', (status) => console.log(status), () => console.log('Action is successful.'), (error) => console.error(error.message));
          setTimeout(()=>{
            file.play();
          },1000);

          setTimeout(()=>{
            file.play();
          },1700);
          
          setTimeout(()=>{
            file.stop();
            file.release();
          },2300);
      }

      if(id == 4){
        this.blt.write(Guimo.SCREEN_APPLE);
        this.guimo.addFood(5);
        this.guimo.addHealth(9);
        const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/Bite3.mp3', (status) => console.log(status), () => console.log('Action is successful.'), (error) => console.error(error.message));
          setTimeout(()=>{
            file.play();
          },1000);

          setTimeout(()=>{
            file.play();
          },1700);
          
          setTimeout(()=>{
            file.stop();
            file.release();
          },2300);
      }

      if(id == 5){
        this.blt.write(Guimo.SCREEN_SODA);
        this.guimo.addFood(5);
        this.guimo.addHealth(-4);
        const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/Slurp7.mp3', (status) => console.log(status), () => console.log('Action is successful.'), (error) => console.error(error.message));
          setTimeout(()=>{
            file.play();
          },1400);

          
          setTimeout(()=>{
            file.stop();
            file.release();
          },2300);
      }
      if(id == 6){
        this.blt.write(Guimo.SCREEN_ICECREAM);
        this.guimo.addFood(5);
        this.guimo.addHealth(6);
        const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/Slurp7.mp3', (status) => console.log(status), () => console.log('Action is successful.'), (error) => console.error(error.message));
          setTimeout(()=>{
            file.play();
          },1400);
          
          setTimeout(()=>{
            file.stop();
            file.release();
          },2300);
      } 
      if(id == 7){
        this.blt.write(Guimo.SCREEN_JUICE);
        this.guimo.addFood(5);
        const file: MediaObject = this.media.create('/android_asset/www/assets/sounds/Slurp7.mp3', (status) => console.log(status), () => console.log('Action is successful.'), (error) => console.error(error.message));

          setTimeout(()=>{
            file.play();
          },1400);
          
          setTimeout(()=>{
            file.stop();
            file.release();
          },2300);
      }     
    }else{
      let tst = this.toast.create({
        message: "Ei, estou sem fome, =P",
        duration:3000,
        position:'middle',
      });
      tst.present();
    }

    setTimeout(()=>{
      this.blt.write(this.guimo.activeScreen);
      console.log(this.guimo.activeScreen);
    },3500);

  }

}
