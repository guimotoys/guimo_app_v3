import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlatformCheck provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PlatformCheck {
  public pltAndroid: boolean = this.isAndroid();
  public pltIos: boolean = this.isIos();
  public pltWp: boolean = this.isWindows();

  constructor(public platform: Platform) {

  }


  public isAndroid(): boolean{
    if(this.platform.is('android')){
      return true;
    }
    return false
  }

  public isWindows(): boolean{
    if(this.platform.is('windows')){
      return true;
    }
    return false;
  }

  public isIos():boolean{
    if(this.platform.is('iphone') || this.platform.is('ipad')){
      return true;
    }
    return false;
  }

  public ready(){
    return this.platform.ready()
  }
}
