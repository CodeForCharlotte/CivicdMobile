import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RegisterService } from "../../services/register.service";
import { UserApiService } from "../../services/user-api.service";
import { TokenManagerService } from "../../services/token-manager.service";
import { UserRegisterInterestsPage } from "../user-register-interests/user-register-interests";
import { UserRegisterAboutPage } from "../user-register-about/user-register-about";
import { UserRegisterDistrictPage } from "../user-register-district/user-register-district";
import { HomePage } from "../home/home";
import { UserRegisterAuthInfoPage } from "../user-register-auth-info/user-register-auth-info";

@IonicPage()
@Component({
  selector: 'page-user-register-final',
  templateUrl: 'user-register-final.html',
})
export class UserRegisterFinalPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private registerService:RegisterService,
              public viewCtrl: ViewController,
              private userApiService: UserApiService,
              private tokenManagerService: TokenManagerService) {
  }

  firstTagsArr = [];
  secondTagsArr = []
  thirdTagsArr = [];
  userInfo = this.registerService.getUserInfo();
  userAbout = "";
  userName = "About";
  success = false;

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegisterFinalPage');
    console.log(this.userInfo);
    this.setTagArrays(this.userInfo.Tags);
    this.userName = this.userInfo.DisplayName
  }

  ionViewWillEnter() {
    // remove back button from navbar
    this.viewCtrl.showBackButton(false);
  }

// set the three tag arrays to display up to 9 tags.  if there are more than nine, then the 9th tag will be truncated
  setTagArrays(array) {
    console.log(array);
    this.firstTagsArr = [];
    this.secondTagsArr = [];
    this.thirdTagsArr = [];
    if(array.length < 10) {
      for (var i = 0; i < array.length; i = i + 3) {
        this.firstTagsArr.push(array[i]);
        if(array[i + 1]) {
          this.secondTagsArr.push(array[i + 1]);
        }
        if(array[i + 2]) {
          this.thirdTagsArr.push(array[i + 2]);
        }
      }
    } else {
      for (var j = 0; j < 9; j = j + 3) {
        this.firstTagsArr.push(array[j]);
        if(array[j + 1]) {
          this.secondTagsArr.push(array[j + 1]);
        }
        if(array[j + 2]) {
          this.thirdTagsArr.push(array[j + 2]);
        }
      }
      this.thirdTagsArr.splice(-1, 1, "...")
    }
  }

  submitAllInfo() {
    console.log("submitting info: ", this.userInfo);
    this.userInfo.Tags = [{Name: "Conservative" }]
    this.userApiService.createUser(this.userInfo)
    .subscribe(
      (data) => {
        console.log("success creating user", data);
        this.userApiService.logInUser(this.userInfo.Email, this.userInfo.Password)
        .subscribe(
          (info) => {
            console.log("SUCCES LOGGING IN USER", info);
            this.tokenManagerService.createToken(info);
            this.success = true;
            setTimeout(() => {this.navCtrl.setRoot(HomePage, {noBack: true}, {animate: true, animation: "ios-transition", direction: "forward", duration: 3000, })}, 1500)
          },
          (error) => console.log("error logging in user", error)
        )
      },
      (err) => console.log('err submitting user', err)
    )
    ;

  }

  goHome() {
    this.navCtrl.setRoot(HomePage, {noBack: true}, {animate: true, animation: "ios-transition", direction: "forward", duration: 5000, })
  }

  backToAuthInfo() {
    this.navCtrl.push(UserRegisterAuthInfoPage, {final: true, noBack: true}, {animate: true, animation: "ios-transition", direction: "back", duration: 1000, });
  }
  backToTags() {
    this.navCtrl.push(UserRegisterInterestsPage, {final: true, noBack: true}, {animate: true, animation: "ios-transition", direction: "back", duration: 1000, });
  }
  backToAbout() {
    this.navCtrl.push(UserRegisterAboutPage, {final: true, noBack: true}, {animate: true, animation: "ios-transition", direction: "back", duration: 1000, });
  }
  backToDistrict() {
    this.navCtrl.push(UserRegisterDistrictPage, {final: true, noBack: true}, {animate: true, animation: "ios-transition", direction: "back", duration: 1000, });
  }



}
