// This component is for a popover menu that shows up from a click on the navbar profile icon //

import { Component } from "@angular/core";
import { ViewController, NavController, App } from "ionic-angular";
import { UserLoginPage } from "../../pages/user-login/user-login";
import { UserSettingsPage } from "../../pages/user-settings/user-settings";
import { UserApiService } from "../../services/user-api.service";
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
  userName = "Hello";
  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public appCtrl: App,
              private userApiService: UserApiService,
              private registerService: RegisterService) {
                this.userApiService.user$.subscribe(
                  (data: any) => {
                    this.userName = data.DisplayName;
                  }
                )
              }




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
