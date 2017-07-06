import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BtConnectPage } from './bt-connect';

@NgModule({
  declarations: [
    BtConnectPage,
  ],
  imports: [
    IonicPageModule.forChild(BtConnectPage),
  ],
  exports: [
    BtConnectPage
  ]
})
export class BtConnectPageModule {}
