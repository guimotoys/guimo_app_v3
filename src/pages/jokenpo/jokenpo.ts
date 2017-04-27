import { Guimo } from './../../providers/guimo';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Jokenpo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-jokenpo',
  templateUrl: 'jokenpo.html'
})
export class JokenpoPage {
  guimoPoints = 0;
  myPoints = 0;
  guimoPlayed:boolean = false;
  playing:boolean = false;
  guimoChoose:number = 0;
  private msgs:Array<string> = [
    "Parabéns você ganhou <i class='fa fa-smile-o'></i>",
    "O Guimo ganhou essa, hahaha!",
    "Ihhh essa deu empate <i class='fa fa-frown-o'></i>"
  ]
  result:string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private blt: BluetoothSerial) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JokenpoPage');
  }

  private getRandNumber(min, max):number{
    return Math.floor(Math.random() * max )+ min;
  }

  play(playerChoose:number){
    if(!this.playing){
      this.playing = true;
      this.guimoChoose = this.getRandNumber(1,3);
    
      //Se o player escolher Pedra e o Guimo Tesoura, PlayerGanha
      if(playerChoose == 1 && (this.guimoChoose == 3 )){
        this.myPoints++;
        this.result = this.msgs[0];
       // this.blt.write("tesoura\n");
      }

      //Se o player escolher Papel e o Guimo Pedra, PlayerGanha
      if(playerChoose == 2 && (this.guimoChoose == 1)){
        this.myPoints++;
        this.result = this.msgs[0];
        // this.blt.write("pedra\n");
      }

      //Se o player escolher Tesoura e o Guimo Papel, PlayerGanha
      if(playerChoose == 3 && (this.guimoChoose == 2)){
        this.myPoints++;
        this.result = this.msgs[0];
        // this.blt.write("papel\n");
      }

      //Se o player escolher Pedra e o Guimo Papel, Guimo Ganha
      if(playerChoose == 1 && (this.guimoChoose == 2)){
        this.guimoPoints++;
        this.result = this.msgs[1];
        // this.blt.write("papel\n");
      }

      //Se o player escolher Papel e o Guimo Tesoura, Guimo Ganha
      if(playerChoose == 2 && (this.guimoChoose == 3)){
        this.guimoPoints++;
        this.result = this.msgs[1];
        // this.blt.write("tesoura\n");
      }

      //Se o player escolher Tesoura e o Guimo Pedra, Guimo
      if(playerChoose == 3 && (this.guimoChoose == 1)){
        this.guimoPoints++;
        this.result = this.msgs[1];
        // this.blt.write("pedra\n");
      }

      if(playerChoose == this.guimoChoose){
        this.guimoPoints++;
        this.myPoints++;
        this.result = this.msgs[2];
        // this.blt.write("empate\n");
      }
      
      this.guimoPlayed = true;
      setTimeout(()=>{
        this.playing = false;
        this.guimoChoose = 0;
        this.guimoPlayed = false;
        this.result = "";
        this.blt.write(Guimo.SCREEN_DEFAULT);
       },5000);

    }
    
  }

}
