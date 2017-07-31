import { QrTestPageModule } from './../pages/qr-test/qr-test.module';
import { BtConnectPageModule } from './../pages/bt-connect/bt-connect.module';
import { MediaPlugin } from '@ionic-native/media';
import { SecretPage } from './../pages/secret/secret';
import { JokenpoPage } from './../pages/jokenpo/jokenpo';
import { NgModule, ErrorHandler, NO_ERRORS_SCHEMA } from '@angular/core';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { BlocksPage } from './../pages/blocks/blocks';
import { ConversationPage } from './../pages/conversation/conversation';
import { ConfigPage } from './../pages/config/config';
import { FoodsPage } from './../pages/foods/foods';
import { HomePage } from '../pages/home/home';
import { HqHomePage } from './../pages/hq-home/hq-home';
import { MissionsPage } from './../pages/missions/missions';
import { Mission01HqPage } from './../pages/mission01-hq/mission01-hq';
import { Mission01Page } from './../pages/mission01/mission01';
import { Mission02HqPage } from './../pages/mission02-hq/mission02-hq';
import { Mission02Page } from './../pages/mission02/mission02';
import { Mission03HqPageModule } from './../pages/mission03-hq/mission03-hq.module';
import { Mission03PageModule } from './../pages/mission03/mission03.module';
import { ScreenChangePage } from './../pages/screen-change/screen-change';
import { VirtualControllerPage } from './../pages/virtual-controller/virtual-controller';
import { MyApp } from './app.component';

import { BackgroundMode } from '@ionic-native/background-mode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Guimo } from './../providers/guimo';
import { GuimoDb } from './../providers/guimo-db';
import { PlatformCheck } from './../providers/platform-check';
import { FooterBarComponent } from './../components/footer-bar/footer-bar';
import { HomeMenuComponent } from './../components/home-menu/home-menu';
import { HomeTipsComponent } from './../components/home-tips/home-tips';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '9f7e507c'
  }
};

@NgModule({
  declarations: [
    BlocksPage,
    ConfigPage,
    ConversationPage,
    FoodsPage,
    MyApp,
    MissionsPage,
    Mission01Page,
    Mission01HqPage,
    Mission02Page,
    Mission02HqPage,
    HomePage,
    HqHomePage,
    JokenpoPage,
    ScreenChangePage,
    SecretPage,
    VirtualControllerPage,
    FooterBarComponent,
    HomeTipsComponent,
    HomeMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Mission03HqPageModule,
    Mission03PageModule,
    BtConnectPageModule,
    QrTestPageModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BlocksPage,
    ConversationPage,
    ConfigPage,
    FoodsPage,
    MyApp,
    HqHomePage,
    HomePage,
    MissionsPage,
    Mission01Page,
    Mission01HqPage,
    Mission02Page,
    Mission02HqPage,
    JokenpoPage,
    ScreenChangePage,
    SecretPage,
    VirtualControllerPage
  ],
  providers: [
    BarcodeScanner,
    BluetoothSerial,
    ScreenOrientation,
    SplashScreen,
    Guimo,
    GuimoDb,
    StatusBar,
    PlatformCheck,
    MediaPlugin,
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
