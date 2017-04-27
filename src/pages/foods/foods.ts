import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';

import { GuimoDb } from './../../providers/guimo-db';
import { Guimo } from './../../providers/guimo';
import { PlatformCheck } from './../../providers/platform-check';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private plt: PlatformCheck,
    private guimoDb: GuimoDb,
    private guimo:Guimo,
    private blt: BluetoothSerial,
    private toast:ToastController,
    private scr:ScreenOrientation,
    private events:Events) {}

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
    
    if(this.guimo.food < 100){
      if(id == 1){
        this.blt.write(Guimo.SCREEN_FRIES);
        this.guimo.addFood(5);
      }

      if(id == 2){
        this.blt.write(Guimo.SCREEN_HOTDOG);
        this.guimo.addFood(5);
      }

      if(id == 3){
        this.blt.write(Guimo.SCREEN_BURGER);
        this.guimo.addFood(5);
      }

      if(id == 4){
        this.blt.write(Guimo.SCREEN_APPLE);
        this.guimo.addFood(5);
      }

      if(id == 5){
        this.blt.write(Guimo.SCREEN_SODA);
        this.guimo.addFood(5);
      }
      if(id == 6){
        this.blt.write(Guimo.SCREEN_ICECREAM);
        this.guimo.addFood(5);
      } 
      if(id == 7){
        this.blt.write(Guimo.SCREEN_JUICE);
        this.guimo.addFood(5);
      }     
    }

  }

}
