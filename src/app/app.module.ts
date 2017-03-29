import { LocalNotifications } from '@ionic-native/local-notifications';
import { HomeTipsComponent } from './../components/home-tips/home-tips';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from './../pages/config/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BackgroundMode } from '@ionic-native/background-mode';

import { Guimo } from './../providers/guimo';
import { PlatformCheck } from './../providers/platform-check';
import { FooterBarComponent } from './../components/footer-bar/footer-bar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage,
    FooterBarComponent,
    HomeTipsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage
  ],
  providers: [
    BluetoothSerial,
    StatusBar,
    SplashScreen,
    Guimo,
    PlatformCheck,
    LocalNotifications,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
