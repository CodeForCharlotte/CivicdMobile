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
  firstColArr = [];
  secondColArr = [];
  thirdColArr = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.userApiService.user$.subscribe(
      (data: any) => {
        console.log("User info form Obs", data);
        this.userInfo = data;
        this.firstColArr = [];
        this.secondColArr = [];
        this.thirdColArr = [];
        if (data) {
          console.log("GETTING HERE");
        for (let i = 0; i < this.userInfo.Tags.length; i = i + 3) {
          this.firstColArr.push(data.Tags[i]);
          if(this.userInfo.Tags[i + 1]) {
            this.secondColArr.push(this.userInfo.Tags[i + 1]);
          }
          if(this.userInfo.Tags[i + 2]) {
            this.thirdColArr.push(this.userInfo.Tags[i + 2]);
          }
        }
      }
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
