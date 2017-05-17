import { Component } from '@angular/core';
import { NavController, NavParams,AlertController} from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GuimoDb } from './../../providers/guimo-db';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
declare var Blockly: any;

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
  workspace: any;
  remaining: any = 2;
  toolbox: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private blt: BluetoothSerial,
    private screenOrientation: ScreenOrientation,
    private alertCtrl: AlertController,
    private guimoDb: GuimoDb) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mission02Page');

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(()=>{
      console.log('Orientation Locked in '+this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }).catch( err =>{
      console.log(err);
    });

    this.toolbox = document.getElementById('toolbox');
    this.workspace = Blockly.inject('blockly',{
      maxBlocks: 2,
      toolbox: this.toolbox,
      zoom: {
        controls: false,
        wheel: false,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3
      },
     trashcan: true
    });

    this.workspace.addChangeListener((evt)=>{
      this.remaining = this.workspace.remainingCapacity();
      if(evt.type == Blockly.Events.DELETE){
        this.remaining = this.workspace.remainingCapacity();
      }
    });
  }

  ionViewWillLeave(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then( () =>{
      console.log('Screen Orientation '+this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  runCode(){
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    let codes = code.split(',');
    codes.splice(-1,1);
  
    let tam = codes.length -1;
    let repeatQtd = parseInt(codes[tam]);

    if(isNaN(repeatQtd)){
      /*********************************************
       * * * RUNS THE FIRST 'gole de pocao' CODE * * *
       *********************************************/

        if(codes.length == 1){
          this.blt.write('pocao1\n').then(()=>{console.log('enviado coracao1')});
          let alert = this.alertCtrl.create({
            title:"Oops!!",
            subTitle: "Parece que não está certo",
            message: "Você deu apenas 1 gole da poção para o Guimo e ele precisa de 3",
            buttons: ["Ok"]
          });

          setTimeout(()=>{
            alert.present();
          },750);
        }

        /********************************************
         * * * RUNS THE SECOND 'gole de pocao' CODE * * *
         ***********************************************/

        if(codes.length == 2){
          this.blt.write('pocao2\n').then(()=>{console.log('enviado coracao2')});
          let alert = this.alertCtrl.create({
            title:"Oops!!",
            subTitle: "Parece que não está certo",
            message: "Você deu 2 goles da poção para o Guimo mas ele precisa de 3",
            buttons: ["Ok"]
          });

          setTimeout(()=>{
            alert.present();
          },750);
        }

    }

    if(!isNaN(repeatQtd)){
      this.blt.write('pocao3\n').then(()=>{console.log('enviando pocao3')});
      let alert = this.alertCtrl.create({
        title:"Parabéns!!",
        subTitle: "Você concluiu a segunda missão!!",
        message: "<img src='assets/imgs/medalha2_hq.jpg' alt='medalha'></img>",
        buttons: [{
          text:"Ok",
          handler: data =>{
            this.navCtrl.popTo(this.navCtrl.getByIndex(1));
          }
        }]
      });
      setTimeout(()=>{
        alert.present();
      },1000);
    }
  }

}
