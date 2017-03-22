import { MainButtonComponent } from './../components/main-button/main-button';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from './../pages/config/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Guimo } from './../providers/guimo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage,
    MainButtonComponent
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
    MainButtonComponent,
    StatusBar,
    SplashScreen,
    Guimo,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
