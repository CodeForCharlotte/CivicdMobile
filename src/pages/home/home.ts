import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TokenManagerService } from "../../services/token-manager.service";
import { UserApiService } from "../../services/user-api.service";
import { UserLoginPage } from "../user-login/user-login";


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private tokenManagerService: TokenManagerService,
              private userApiService: UserApiService) {
  }
  loginPage = UserLoginPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewCanEnter() {
    return this.userApiService.isLoggedIn();
  }

  ionViewWillEnter() {
    if(this.navParams.get("noBack"))
        this.viewCtrl.showBackButton(false);
    }


}
