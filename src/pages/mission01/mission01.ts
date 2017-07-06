import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GuimoDb } from './../../providers/guimo-db';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
declare var Blockly: any;

/*
  Generated class for the Mission01 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mission01',
  templateUrl: 'mission01.html'
})
export class Mission01Page {
workspace: any;
remaining: any = 2;
coracao:any;
toolbox: any;
firstRun: boolean = true;
secndRun: boolean = false;
msgs: any = {
  success:[
    "Parece que o seu código está correto, que legal <i class='fa fa-smile-o' color='secondary' aria-hidden='true'></i>!",
    "Hmmm... vamos ver... <br> Parece que está funcionando!!!Agora tente outra combinação..."
    ],
  tips:[
    "Que tal se você tentar bater o coração do guimo mais vezes <i class='fa fa-question' aria-hidden='true'></i>, com tipo, um loop!",
    "Acho que agora você pode fazer isso de maneira mais facil!! Vou liberar o laço de repetição pra você",
  ],
  error:[
  "Que tal você tentar algum código antes de enviar para o Guimo!!",
  "Ei, não há nada para enviar do seu código <i class='fa fa-frown-o' color='danger' aria-hidden='true'></i>."
]};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private blt: BluetoothSerial,
    private screenOrientation: ScreenOrientation,
    private alertCtrl: AlertController,
    private guimoDb: GuimoDb) {}

  ionViewDidLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(()=>{
      console.log('Orientation Locked in '+this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }).catch( err =>{
      console.log(err);
    });

    this.coracao = document.getElementById('baterCoracao');
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
      if(evt.type == Blockly.Events.CREATE){
        if(this.remaining == 1 && this.firstRun){
          let alert = this.alertCtrl.create({
            title:"Dicas",
            message: "<img src='assets/imgs/tutorial1_2.gif' alt='dica2'></img>",
            buttons: ["Ok"]
          });
          setTimeout(()=>{
            alert.present();
          },600)
        }
      }
    });

  }

  ionViewWillLoad(){
    let alert = this.alertCtrl.create({
      title:"Dicas",
      message: "<img src='assets/imgs/tutorial1_1.jpg' alt='dica1'></img>",
      buttons: ["Ok"]
    });
    setTimeout(()=>{
      alert.present();
    },1000);
    
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
       * * * RUNS THE FIRST 'bater coracao' CODE * * *
       *********************************************/

        if(codes.length == 1 && this.firstRun){
          this.firstRun = false;
          this.blt.write('coracao1\n').then(()=>{console.log('enviado coracao1')});
          let alert = this.alertCtrl.create({
            title:"Dicas",
            message: "<img src='assets/imgs/tutorial1_3.jpg' alt='dica3'></img>",
            buttons: ["Ok"]
          });
          setTimeout(()=>{
            alert.present();
          },600);
        }

        if(codes.length == 2 && !this.secndRun){
          this.secndRun = true;
          this.blt.write('coracao2\n').then(()=>{console.log('enviado coracao2')});
          let alert = this.alertCtrl.create({
            title:"Dicas",
            message: "<img src='assets/imgs/tutorial1_4.jpg' alt='dica3'></img>",
            buttons: ["Ok"]
          });
          this.toolbox.innerHTML += '<block type="guimo_repeat_m1" colour="210"></block>';
          this.workspace.updateToolbox(this.toolbox);
          setTimeout(()=>{
            alert.present();
          },600);
        }

    }

    if(!isNaN(repeatQtd)){
      this.blt.write('coracao3\n').then(()=>{console.log('enviando coracao3')});
      let alert = this.alertCtrl.create({
        title:"Parabéns!!",
        subTitle: "Você concluiu a primeira missão!!",
        message: "<img src='assets/imgs/medalha_hq.jpg' alt='medalha'></img>",
        buttons: [{
          text:"Ok",
          handler: data =>{
            this.guimoDb.updateMissions(2,1).then(()=>{
              console.log('Updated mission 01');
              this.navCtrl.popTo(this.navCtrl.getByIndex(1));
            });
          }
        }]
      });
      setTimeout(()=>{
        alert.present();
      },1000);
    }

  }

  back(){
    console.log('entrou backToMenu');
    this.navCtrl.pop();
  }

}
