import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Mission03Page } from './mission03';

@NgModule({
  declarations: [
    Mission03Page,
  ],
  imports: [
    IonicPageModule.forChild(Mission03Page),
  ],
  exports: [
    Mission03Page
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class Mission03PageModule {}
