import { Component } from '@angular/core';

import { NavController, Events, LoadingController, FabContainer, AlertController } from 'ionic-angular';

import { Guimo } from './../../providers/guimo';
import { GuimoDb } from './../../providers/guimo-db';
import { PlatformCheck } from './../../providers/platform-check';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { SecretPage } from './../secret/secret';
import { ConfigPage } from './../config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  btStatus: boolean = this.guimo.btStatus;
  btConnected: boolean = this.guimo.btConnected;
  btConnectErr: boolean = false;
  btConnectErrMsg: string = "";
  private secretCount: number = 0;

  constructor(
    public navCtrl: NavController,
    public guimo: Guimo,
    public events: Events,
    private plt: PlatformCheck,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
    private backMode: BackgroundMode,
    private guimoDb: GuimoDb,
    private screenOrientation: ScreenOrientation) {

    this.events.subscribe('bt:status', (btStatus) => {
      this.btStatus = btStatus;
    });

    this.backMode.enable();
    this.backMode.configure({
      silent: true
    });
    this.backMode.setDefaults({
      silent: true
    });

  }

  /**
   * Executes When View was loaded
   */
  ionViewDidLoad() {

    
  }

  /**
   * Open an Page
   * @param p 
   * @param fab 
   */
  openPage(p, fab?: FabContainer) {
    if (p === 'config') {
      fab.close();
      this.navCtrl.push(ConfigPage);
    }

    if (p === 'easteregg') {
      this.navCtrl.push(SecretPage);
    }
  }

  easterEgg() {
    this.secretCount++
    if (this.secretCount >= 5) {
      console.log(this.secretCount);
      this.secretCount = 0;
      this.openPage('easteregg');
    }
  }
}
