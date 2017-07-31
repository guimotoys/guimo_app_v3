import { Guimo } from './../../providers/guimo';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private blt: BluetoothSerial,
    private guimo: Guimo) { }

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
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    let codes = code.split(',');
    
    codes = this.cleanArrayCode(codes);
    console.log(codes);

    let codIf = codes[0].split(':');
    if (codIf[0] == 'cond') {
        console.log(codIf);
    } else {
      //this.runCodeWithoutIf(codes);
    }
  }

  /**
   *  Run blockly codes when if is out/not present
   * @param codes Array With Codes by Blockly
   */
  private runCodeWithoutIf(codes: any) {
    console.log(codes);
    let i = 0;
    let tam = codes.length - 1;
    let repeatQtd = parseInt(codes[tam]);

    /*if (!isNaN(repeatQtd)) {
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


      for (var n = 0; n < arrayCodeRun.length; n++) {
        this.runCodeSleepLoop(n, arrayCodeRun[n], 500);
      };
    }

    if (isNaN(repeatQtd)) {
      for (var n = 0; n < codes.length; n++) {
        this.runCodeSleepLoop(n, codes[n], 500);
      }
    }*/
  }

  private runCodeSleepLoop(i: number, code: any, time: number) {
    setTimeout(() => {
      //console.log(code);
      //SEND BLUETOOTH CODE HERE
      this.blt.write(code).then(() => {
        console.log('Código ' + code + ' enviado');
      });
    }, (i + 1) * time);
  }

  /**
   * clean any space in codes
   * @param codes array of Blockly Codes
   */
  private cleanArrayCode(codes:any){
    for (var i = 0; i < codes.length; i++) {
      /**Remove all spaces from vector / /g means all global spaces */
      codes[i] = codes[i].replace(/ /g, "");
      if(codes[i] == ""){
        codes.splice(i,1);
      }
      
    }
    return codes;
  }
}
