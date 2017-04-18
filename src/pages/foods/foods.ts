import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { GuimoDb } from './../../providers/guimo-db';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private plt: PlatformCheck,
    private guimoDb: GuimoDb,
    private toast:ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodsPage');

    this.plt.ready().then(()=>{
        this.guimoDb.getFoods().then((result)=>{
          for(var i = 0; i < result.rows.length; i++){
            this.foods.push(result.rows.item(i));
          }
        });
    })
  }

  like(id:number, index:number){
   this.foods[index].status = 1;
   this.guimoDb.updateFoodStatus(id,this.foods[index].status).then(()=>{
     let toastMsg = this.toast.create({
      message: "Curtido ;)",
      duration: 3000
     });
     toastMsg.present();
   });
  }

  unlike(id:number, index: number){
    this.foods[index].status = -1;
    this.guimoDb.updateFoodStatus(id,this.foods[index].status).then(()=>{
     let toastMsg = this.toast.create({
      message: ":(",
      duration: 3000
     });
     toastMsg.present();
   });
  }

  resetStatus(id:number, index:number){
    this.foods[index].status = 0;
  }

}
