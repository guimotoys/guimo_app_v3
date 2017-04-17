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
    private screenOrientation: ScreenOrientation) {}

  ionViewDidLoad(){
    this.workspace = Blockly.inject('blockly',{
      toolbox: document.getElementById('toolbox')
    });
  };

  ionViewWillLoad(){
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

  runCode(){
  
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    let codes = code.split(',');
    codes.splice(-1,1);
  
    let i =0;
    let tam = codes.length -1;
    let repeatQtd = parseInt(codes[tam]);

    if(!isNaN(repeatQtd)){
        var codesLength = codes.length - 1;
        var code;
        var arrayCodes: Array<any> = [];
        while(i < codesLength){
          code = codes[i].split("  ");
          for(var j = 0; j < code.length; j++){
            if(code[j] != ""){
              arrayCodes.push(code[j]);
            }
          }
          i++;
        }
        console.log(arrayCodes);
        for(var k = 1; k < repeatQtd; k++){
            setTimeout(()=>{
              console.log(arrayCodes[0]);
              
            },k*1050);
          
          }

        }
        

  }

}
