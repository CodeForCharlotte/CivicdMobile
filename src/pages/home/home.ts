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
  checkedInAmt = 0;
  portfolioPic = "../../assets/imgs/default_portfolio.png";
  userInfo;

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.userApiService.user$.subscribe(
      (data) => {
        console.log("User info form Obs", data);
        this.userInfo = data;
      },
      (err) => {
        console.log("there was an error getting user info", err)
      }
    )
  }

  ionViewCanEnter() {
    return this.userApiService.isLoggedIn();
  }

  ionViewWillEnter() {
    if(this.navParams.get("noBack"))
        this.viewCtrl.showBackButton(false);
    }


}
