import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
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
  style: any = { width: '60%', height: '70%' };
  workspace: any;
  remaining: any = 2;
  coracao: any;
  toolbox: any;
  firstRun: boolean = true;
  secndRun: boolean = false;
  hidePage: boolean = true;
  overlayMsg: string = "";
  overlayTitle: string = "";
  overlayImg: String = "";
  final: boolean = false;
  steps: boolean = true;
  interval: any = null;
  spinHide: boolean = true;
  dicas: string = "Faça o coração bater 1 vez.";
  msgs: any = {
    success: [
      "Parece que o seu código está correto, que legal <i class='fa fa-smile-o' color='secondary' aria-hidden='true'></i>!",
      "Hmmm... vamos ver... <br> Parece que está funcionando!!!Agora tente outra combinação..."
    ],
    tips: [
      "Que tal se você tentar bater o coração do guimo mais vezes <i class='fa fa-question' aria-hidden='true'></i>, com tipo, um loop!",
      "Acho que agora você pode fazer isso de maneira mais facil!! Vou liberar o laço de repetição pra você",
    ],
    error: [
      "Que tal você tentar algum código antes de enviar para o Guimo!!",
      "Ei, não há nada para enviar do seu código <i class='fa fa-frown-o' color='danger' aria-hidden='true'></i>."
    ]
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private blt: BluetoothSerial,
    private screenOrientation: ScreenOrientation,
    private alertCtrl: AlertController,
    private evt: Events,
    private guimoDb: GuimoDb) {
    this.evt.subscribe('guimo:continue', (data) => {
      if (data == true) {
        this.spinHide = true;

        if (this.firstRun) {
          this.firstRun = false;
          this.blt.write('coracao1\n').then(() => { console.log('enviado coracao1') });
          this.overlayMsg = "";
          this.overlayTitle = "Dica";
          this.overlayImg = "assets/imgs/tutorial1_3.jpg"
          setTimeout(() => {
            this.hidePage = false;
            this.dicas = "Agora o coração do Guimo precisa bater 2 vezes"

          }, 1000);
        }

        if(this.secndRun){
          this.overlayMsg = "";
          this.overlayTitle = "Dica";
          this.overlayImg = "assets/imgs/tutorial1_4.jpg"
          setTimeout(() => {
            this.dicas = "Agora faça o coração bater 3 vezes!!!"
            this.hidePage = false;
          }, 700);
        }

        if(this.final){
          this.overlayMsg = "<i class='fa fa-smile-o' color='secondary'></i> Você concluiu a primeira missão!!";
          this.overlayTitle = "Parabéns";
          this.overlayImg = "assets/imgs/medalha_hq.jpg"
          setTimeout(() => {
            this.spinHide = true;
            this.steps = false;
            this.hidePage = false;
          }, 700);
        }
      }
    })
  }

  ionViewDidLoad() {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(() => {
      console.log('Orientation Locked in ' + this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }).catch(err => {
      console.log(err);
    });

    this.coracao = document.getElementById('baterCoracao');
    this.toolbox = document.getElementById('toolbox');
    this.workspace = Blockly.inject('blockly', {
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

    this.interval = setInterval(() => {
      this.remaining = this.workspace.remainingCapacity();
    }, 250);

    this.workspace.addChangeListener((evt) => {

      if (evt.type == Blockly.Events.CREATE) {

        if (this.firstRun) {
          console.log('teste tutorial 2')
          /*let alert = this.alertCtrl.create({
            title:"Dicas",
            message: "<img src='assets/imgs/tutorial1_2.gif' alt='dica2'></img>",
            buttons: ["Ok"]
          });*/
          //setTimeout(()=>{
          //alert.present();
          //},1500)
          this.overlayMsg = "";
          this.overlayTitle = "Dica";
          this.overlayImg = "assets/imgs/tutorial1_2.gif"

          setTimeout(() => {
            this.hidePage = false;
            this.dicas = "Agora é só apertar o play!! "
          }, 400);
        }
      }
    });

  }

  ionViewWillLoad() {
    this.overlayMsg = "";
    this.overlayTitle = "Dica";
    this.overlayImg = "assets/imgs/tutorial1_1.jpg"
    setTimeout(() => {
      this.hidePage = false;
    }, 1200);
  }

  ionViewWillLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
      console.log('Screen Orientation ' + this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  continueMission() {
    if (this.final == false) {
      this.hidePage = true;
    } else {
      this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    }
  }

  finishMission() {
    clearInterval(this.interval);
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }

  runCode() {

    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    let codes = code.split(',');
    codes.splice(-1, 1);

    let tam = codes.length - 1;
    let repeatQtd = parseInt(codes[tam]);
    if (isNaN(repeatQtd)) {
      /*********************************************
       * * * RUNS THE FIRST 'bater coracao' CODE * * *
       *********************************************/

      if (codes.length == 1 && this.firstRun) {
        /**/
        this.spinHide = false;
      }

      if (codes.length == 2 && !this.secndRun) {
        this.secndRun = true;
        this.firstRun = false;
        this.spinHide = false;
        this.blt.write('coracao2\n').then(() => { console.log('enviado coracao2') });
        this.toolbox.innerHTML += '<block type="guimo_repeat_m1" colour="210"></block>';
        this.workspace.updateToolbox(this.toolbox);
        
      }

    }

    if (!isNaN(repeatQtd)) {
      this.secndRun = false;
      this.firstRun = false;
      if (repeatQtd == 1) {
        this.blt.write('coracao1\n').then(() => { console.log('enviando coracao3') });
        this.overlayMsg = "<i class='fa fa-frown-o' color='danger'></i>  O Guimo precisa bater o coração 3 vezes";
        this.overlayTitle = "Oops";
        this.overlayImg = "";
        setTimeout(() => {
          this.hidePage = false;
        }, 800);
      }

      if (repeatQtd == 2) {
        this.blt.write('coracao2\n').then(() => { console.log('enviando coracao3') });
        this.overlayMsg = "Não parece correto <i class='fa fa-frown-o' color='danger'></i> <br> O Guimo precisa bater o coração 3 vezes";
        this.overlayTitle = "Oops";
        this.overlayImg = ""
        setTimeout(() => {
          this.hidePage = false;
        }, 800);
      }

      if (repeatQtd > 2) {
        
        this.spinHide = false;
        this.blt.write('coracao3\n').then(() => { console.log('enviando coracao3') });
        
        this.guimoDb.updateMissions(2, 1).then(() => {
          this.final = true;
          this.guimoDb.updateMissions(1, 2);
          this.style = { width: '35%', height: '70%' };          
        });
      }

    }
  }

  back() {
    console.log('entrou backToMenu');
    this.navCtrl.pop();
  }

}
