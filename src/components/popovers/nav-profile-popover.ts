// This component is for a popover menu that shows up from a click on the navbar profile icon //

import { Component } from "@angular/core";
import { ViewController, NavController, App } from "ionic-angular";
import { UserLoginPage } from "../../pages/user-login/user-login";
import { UserSettingsPage } from "../../pages/user-settings/user-settings";
import { RegisterService } from "../../services/register.service";

@Component({
  template: `
    <ion-list>
      <ion-list-header>{{userName}}</ion-list-header>
      <button ion-item (click)="logout()"><ion-icon name="alert" item-left></ion-icon>Logout</button>
      <button ion-item (click)="settings()"><ion-icon name="settings" item-left></ion-icon>Settings</button>
    </ion-list>
  `
})
export class NavProfilePopover {
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public appCtrl: App, private registerService: RegisterService) {}

  userName = "Kemba Walker"


  logout() {
    console.log("logged out");
    this.registerService.resetUserInfo();
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(UserLoginPage);
  }
  settings() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(UserSettingsPage);
  }
}
