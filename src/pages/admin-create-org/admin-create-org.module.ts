import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCreateOrgPage } from './admin-create-org';

@NgModule({
  declarations: [
    AdminCreateOrgPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCreateOrgPage),
  ],
})
export class AdminCreateOrgPageModule {}
