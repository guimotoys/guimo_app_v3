import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { GuimoDb } from './../../providers/guimo-db';
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
 
  pocoes = [
    {
      img: 'pocao1.png',
      value: 1,
      name:'Poção Amarela',
      selected: false,
    },
    {
      img: 'pocao2.png',
      value: 2,
      name:'Poção Azul',
      selected: false,
    },
    {
      img: 'pocao4.png',
      value: 4,
      name:'Poção Vermelha',
      selected: false,
    },
  ];
  pocoesSelected: Array<number> = [];
  somaPocao:number  = 0;
  imgPocao = "pocao"+this.somaPocao+".png";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private alt: AlertController,
    private guimoDb: GuimoDb,
    private evt: Events,
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mission02Page');

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(()=>{
      console.log('Orientation Locked in '+this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }).catch( err =>{
      console.log(err);
    });

  }

  ionViewWillLeave(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then( () =>{
      console.log('Screen Orientation '+this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  misturaPocao(value:number, i: number){
    if(this.pocoesSelected.length < 2){
      
      this.pocoesSelected.push(value);
      this.pocoes[i].selected = true;
      this.somaPocao = 0;
        for(var i =0; i < this.pocoesSelected.length; i++){
          this.somaPocao += this.pocoesSelected[i];
        }
        if(this.somaPocao == 3 ){
          let alert = this.alt.create({
            title:"Parabéns!!",
            subTitle: "Você concluiu a segunda missão missão!!",
            message: "<img src='assets/imgs/medalha2_hq.png' alt='medalha'></img>",
            buttons: [{
              text:"Ok",
              handler: data =>{
                this.guimoDb.updateMissions(3,1).then(()=>{
                  console.log('Updated mission 02');
                  this.navCtrl.popTo(this.navCtrl.getByIndex(1));
                });
              }
            }]
          });
          setTimeout(()=>{
            alert.present();
          },1000);
        }

        this.imgPocao = "pocao"+this.somaPocao+".png";
    }else{
      for(var j = 0; j < this.pocoes.length; j++){
        this.pocoes[j].selected = false;
      }
      this.pocoesSelected = [];
      this.misturaPocao(value,i);
    }
    
    if(this.pocoesSelected.length == 1){
      this.imgPocao = "pocao"+this.somaPocao+".png";
    }

  }

  resetBalde(){
    this.pocoesSelected = [];
    this.somaPocao = 0;
    this.imgPocao = "pocao"+this.somaPocao+".png";
    for(var j = 0; j < this.pocoes.length; j++){
      this.pocoes[j].selected = false;
    }
  }

}
