import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TokenManagerService } from "../../services/token-manager.service";
import { UserApiService } from "../../services/user-api.service";
import { UserLoginPage } from "../user-login/user-login";


@IonicPage()
@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
})
export class UserSettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private tokenManagerService: TokenManagerService,
              private userApiService: UserApiService) {
  }
  

  ionViewDidLoad() {

  }


  ionViewCanEnter() {
    return this.userApiService.isLoggedIn();
  }



}
