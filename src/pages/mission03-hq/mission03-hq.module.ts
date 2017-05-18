import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Mission03HqPage } from './mission03-hq';

@NgModule({
  declarations: [
    Mission03HqPage,
  ],
  imports: [
    IonicPageModule.forChild(Mission03HqPage),
  ],
  exports: [
    Mission03HqPage
  ]
})
export class Mission03HqPageModule {}
