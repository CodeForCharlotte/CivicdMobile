import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetCivicdPage } from './get-civicd';

@NgModule({
  declarations: [
    GetCivicdPage,
  ],
  imports: [
    IonicPageModule.forChild(GetCivicdPage),
  ],
})
export class GetCivicdPageModule {}
