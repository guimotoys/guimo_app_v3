import { Guimo } from './../../providers/guimo';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
declare var Blockly: any;
/*
  Generated class for the Blocks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html'
})
export class BlocksPage {
  workspace: any;
  private hwCheckInterval: any;
  private ifCond = 'sensord';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private blt: BluetoothSerial,
    private guimo: Guimo,
    private evt: Events) {
    this.hwCheckInterval = setInterval(() => {
      this.blt.write('infra\n');
    }, 1000);

    this.evt.subscribe('guimo:if', (data) => {
      this.ifCond = data;
    });
  }

  ionViewDidLoad() {
    this.workspace = Blockly.inject('blockly', {
      toolbox: document.getElementById('toolbox'),
      zoom: {
        controls: false,
        wheel: false,
        startScale: 0.7,
        maxScale: 3,
        minScale: 0.3
      },
      trashcan: false
    });

  };

  ionViewWillLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(() => {
      console.log('Orientation Locked in ' + this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }).catch(err => {
      console.log(err);
    });
  }

  ionViewWillLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
      console.log('Screen Orientation ' + this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  backToMenu() {
    console.log('entrou backToMenu');
    this.navCtrl.pop();
  }


  runCode() {

    Blockly.JavaScript.addReservedWords('code');
    let code = Blockly.JavaScript.workspaceToCode(this.workspace);
    let qtd = NaN;
    code = code.replace(/ /g, '');
    code = code.replace(/,,/g, ',');
    let codes = code.split(',');
    let lastCode;
    var splitIf = code.split('if:');
    //splitIf.splice(splitIf[splitIf.length - 1],1);
    //console.log(splitIf);


    /** Tem If */
    if (splitIf.length == 2) {
      let codeHelper = splitIf[1].split('else:');
      let codeIf = codeHelper[0].split(',');
      let codeElse = codeHelper[1].split(',');
      let cond = codeIf[0];

      codeIf.splice(codeIf.length - 1, 1);
      codeIf.splice(0, 1);
      codeElse.splice(codeElse.length - 1, 1);
      qtd = parseInt(codeElse[codeElse.length - 1]);

      if (isNaN(qtd)) {
        qtd = 1;
      } else {
        codeElse.splice(codeElse.length - 1, 1);
      }
      console.log(codeIf, codeElse);

      /** Roda blocos de acordo com multiplicador de correção */
      /** Multiplicador é numero que determina o tempo que cada bloco será executado*/
      this.runCodeWithIf(splitIf, cond, codeIf, codeElse, qtd)

      // Não tem If 
    } else {
      codes.splice(codes.length - 1, 1);
      this.cleanArrayCode(codes);
      this.runCodeWithoutIf(codes);
    }

    codes = this.cleanArrayCode(codes);


    /*let codIf = codes[0].split(':');
    if (codIf[0] == 'cond') {
        console.log('codif');
        this.checkCodeIf(codes);
    } else {
      this.runCodeWithoutIf(codes);
    }*/
  }

  /**
   *  Run blockly codes when if is out/not present
   * @param codes Array With Codes by Blockly
   */
  private runCodeWithoutIf(codes: any) {
    let i = 0;
    let tam = codes.length - 1;
    let repeatQtd = parseInt(codes[tam]);
    if (!isNaN(repeatQtd)) {
      var codesLength = codes.length - 1;
      var code;
      var arrayCodes: Array<any> = [];
      var arrayCodeRun: Array<any> = [];
      while (i < codesLength) {
        code = codes[i].split("  ");
        for (var j = 0; j < code.length; j++) {
          if (code[j] != "") {
            arrayCodes.push(code[j]);
          }
        }
        i++;
      }

      for (var k = 0; k < repeatQtd; k++) {
        for (var m = 0; m < arrayCodes.length; m++) {
          arrayCodeRun.push(arrayCodes[m]);
        }
      }


      this.guimo.vibrateFast();
      for (var n = 0; n < arrayCodeRun.length; n++) {
        this.runCodeSleepLoop(n, arrayCodeRun[n], 500);
      };
    }

    if (isNaN(repeatQtd)) {
      this.guimo.vibrateFast();
      for (var n = 0; n < codes.length; n++) {
        this.runCodeSleepLoop(n, codes[n], 500);
      }
    }
  }

  /**
   * 
   * @param splitIf 
   * @param cond 
   * @param codeIf 
   * @param codeElse 
   * @param loopIterator 
   */
  private runCodeWithIf(splitIf, cond, codeIf, codeElse, loopIterator) {
    /**Não tem blocos antes do IF */
    if (splitIf[0] == '') {
      if (cond == this.ifCond) {
        var arrayCodeRun: Array<any> = [];
        for (var k = 0; k < loopIterator; k++) {
          for (var m = 0; m < codeIf.length; m++) {
            arrayCodeRun.push(codeIf[m]);
          }
        }

        this.guimo.vibrateFast();
        for (var n = 0; n < arrayCodeRun.length; n++) {
          this.runCodeSleepLoop(n, arrayCodeRun[n], 500);
        };

      } else {
        var arrayCodeRun: Array<any> = [];
        for (var k = 0; k < loopIterator; k++) {
          for (var m = 0; m < codeElse.length; m++) {
            arrayCodeRun.push(codeElse[m]);
          }
        }

        this.guimo.vibrateFast();
        for (var n = 0; n < arrayCodeRun.length; n++) {
          this.runCodeSleepLoop(n, arrayCodeRun[n], 500);
        }
      }
      /** Tem blocos antes do If... executa eles primeiro, depois o */
    } else {

      /** SEPARA CÓDIGO ANTES DO IF */
      var beforeIf = splitIf[0].split(',');
      beforeIf.splice(beforeIf.length - 1, 1);

      /* IF QUE VERIFICA O BLOCO IF  */
      if (cond == this.ifCond) {
        /* FOR PRA RODAR O CÓDIGO ANTES DO IF*/
        //LOOP CÓDIGO ANTES DO IF
        var codes = beforeIf.concat(codeIf);
        var arrayCodeRun: Array<any> = [];
        for (var k = 0; k < loopIterator; k++) {
          for (var m = 0; m < codes.length; m++) {
            arrayCodeRun.push(codes[m]);
          }
        }

        this.guimo.vibrateFast();
        for (var n = 0; n < arrayCodeRun.length; n++) {
          this.runCodeSleepLoop(n, arrayCodeRun[n], 500);
        };

      } else {
        var codes = beforeIf.concat(codeElse);
        var arrayCodeRun: Array<any> = [];
        for (var k = 0; k < loopIterator; k++) {
          for (var m = 0; m < codes.length; m++) {
            arrayCodeRun.push(codes[m]);
          }
        }

        this.guimo.vibrateFast();
        for (var n = 0; n < arrayCodeRun.length; n++) {
          this.runCodeSleepLoop(n, arrayCodeRun[n], 500);
        };
      }
    }
  }

  private runCodeSleepLoop(i: number, code: any, time: number) {
    setTimeout(() => {

      //console.log(code);
      //SEND BLUETOOTH CODE HERE
      this.blt.write(code).then(() => {
        console.log('Código ' + JSON.stringify(code) + ' enviado ', (i + 1), (i + 1) * time);
      });
    }, (i + 1) * time);
  }

  /**
   * clean any space in codes
   * @param codes array of Blockly Codes
   */
  private cleanArrayCode(codes: any) {
    for (var i = 0; i < codes.length; i++) {
      /**Remove all spaces from vector / /g means all global spaces */
      codes[i] = codes[i].replace(/ /g, "");
      if (codes[i] == "") {
        codes.splice(i, 1);
      }
    }
    return codes;
  }

  /*private checkCodeIf(codes){
    for(var i = 0; i < codes.length;i++){
        let helper = codes[i].split(':');
        console.log(helper.length);     
    }
  }*/
}
