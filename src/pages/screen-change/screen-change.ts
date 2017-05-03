import { GuimoDb } from './../../providers/guimo-db';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Guimo } from './../../providers/guimo';

/*
  Generated class for the ScreenChange page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-screen-change',
  templateUrl: 'screen-change.html'
})
export class ScreenChangePage {
  screens: Array<any> = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private guimo:Guimo,
    private guimoDb: GuimoDb,
    private blt:BluetoothSerial,
    private plt:Platform,
    private scr:ScreenOrientation) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreenChangePage');

    this.plt.ready().then(()=>{
      this.scr.lock(this.scr.ORIENTATIONS.LANDSCAPE);
      this.guimoDb.getScreens().then((result)=>{
          for(var i = 0; i < result.rows.length; i++){
            this.screens.push(result.rows.item(i));
          }

          console.log(this.screens);
        });
    });

  }

  ionViewWillLeave(){
    this.scr.lock(this.scr.ORIENTATIONS.PORTRAIT);
  }

  like(id:number, index:number){
   this.screens[index].status = 1;
   this.guimoDb.updateScreenStatus(id,this.screens[index].status);
  }

  unlike(id:number, index: number){
    this.screens[index].status = -1;
    this.guimoDb.updateScreenStatus(id,this.screens[index].status);
  }

  resetStatus(id:number, index:number){
    this.screens[index].status = 0;
    this.guimoDb.updateScreenStatus(id,this.screens[index].status);
  } 

  backToMenu(){
    this.navCtrl.pop();
  }

  sendScreen(id:number){
    switch(id){
      case 1:
        this.blt.write(Guimo.SCREEN_DEFAULT).then(() =>{
          this.guimo.activeScreen = Guimo.SCREEN_DEFAULT;
          console.log(id +"=> "+Guimo.SCREEN_DEFAULT);
        });
        break;
      case 2:
        this.blt.write(Guimo.SCREEN_GLASSES).then(()=>{
          this.guimo.activeScreen = Guimo.SCREEN_GLASSES;
          console.log(id +"=> "+Guimo.SCREEN_GLASSES);
        });
        break;
      case 3:
        this.blt.write(Guimo.SCREEN_GIRL).then(()=>{
          this.guimo.activeScreen = Guimo.SCREEN_GIRL;
          console.log(id +"=> "+Guimo.SCREEN_GIRL);
        });
        break;
      case 4:
        this.blt.write(Guimo.SCREEN_MUSTACHE).then(()=>{
          this.guimo.activeScreen = Guimo.SCREEN_MUSTACHE;
          console.log(id +"=> "+Guimo.SCREEN_MUSTACHE);
        });
        break;
      default:
        this.blt.write(Guimo.SCREEN_DEFAULT).then(() =>{
          this.guimo.activeScreen = Guimo.SCREEN_DEFAULT;
          console.log(id +"=> "+Guimo.SCREEN_DEFAULT);
        });

    }
  }


}
