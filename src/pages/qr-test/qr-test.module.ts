import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrTestPage } from './qr-test';

@NgModule({
  declarations: [
    QrTestPage,
  ],
  imports: [
    IonicPageModule.forChild(QrTestPage),
  ],
  exports: [
    QrTestPage
  ]
})
export class QrTestPageModule {}
