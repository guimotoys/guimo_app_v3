import { MediaObject, MediaPlugin } from '@ionic-native/media';
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
import { Mission01Page } from './../pages/mission01/mission01';
import { Mission01HqPage } from './../pages/mission01-hq/mission01-hq';
import { Mission02Page } from './../pages/mission02/mission02';
import { Mission02HqPage } from './../pages/mission02-hq/mission02-hq';
import { ScreenChangePage } from './../pages/screen-change/screen-change';
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
    VirtualControllerPage,
    FooterBarComponent,
    HomeTipsComponent,
    HomeMenuComponent,
  ],
  imports: [
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
    VirtualControllerPage
  ],
  providers: [
    BluetoothSerial,
    ScreenOrientation,
    SplashScreen,
    Guimo,
    GuimoDb,
    MediaObject,
    MediaPlugin,
    StatusBar,
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
