import { HomeTipsComponent } from './../components/home-tips/home-tips';
import { NgModule, ErrorHandler, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { BlocksPage } from './../pages/blocks/blocks';
import { ConfigPage } from './../pages/config/config';
import { HomePage } from '../pages/home/home';
import { VirtualControllerPage } from './../pages/virtual-controller/virtual-controller';
import { MyApp } from './app.component';

import { BackgroundMode } from '@ionic-native/background-mode';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Guimo } from './../providers/guimo';
import { GuimoDb } from './../providers/guimo-db';
import { PlatformCheck } from './../providers/platform-check';
import { FooterBarComponent } from './../components/footer-bar/footer-bar';
import { HomeMenuComponent } from './../components/home-menu/home-menu';

@NgModule({
  declarations: [
    BlocksPage,
    MyApp,
    HomePage,
    ConfigPage,
    VirtualControllerPage,
    FooterBarComponent,
    HomeTipsComponent,
    HomeMenuComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BlocksPage,
    MyApp,
    HomePage,
    ConfigPage,
    VirtualControllerPage
  ],
  providers: [
    BluetoothSerial,
    StatusBar,
    ScreenOrientation,
    SplashScreen,
    Guimo,
    GuimoDb,
    PlatformCheck,
    LocalNotifications,
    BackgroundMode,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
