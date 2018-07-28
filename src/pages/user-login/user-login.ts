import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRegisterTypePage } from "../user-register-type/user-register-type";
import { OrgInviteRequestPage } from "../org-invite-request/org-invite-request";
import { HomePage } from "../home/home";
import { UserApiService } from "../../services/user-api.service";
import { TokenManagerService } from "../../services/token-manager.service";

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {
  startRegister = UserRegisterTypePage;
  inviteRequest = OrgInviteRequestPage;
  loginErrMsg = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userApiService: UserApiService,
              private tokenManagerService: TokenManagerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginPage');
  }



  logUserIn(form) {
    console.log("running login function");
    console.log("FORM INFO", form);
    this.userApiService.logInUser(form.value.userName, form.value.userPassword)
    .subscribe(
      (data: any) => {
        console.log(data);
        this.tokenManagerService.createToken(data);
        this.navCtrl.push(HomePage);
        //***** THIS IS AUTH CODE TO PUT IN WHEN THE USER CONTROLLER IS SET UP IN THE API
      //   this.userApiService.getUserInfo(data.userName)
      //   .subscribe(
      //     (userInfo: any) => {
      //       this.userApiService.setUserInfo(data);
      //     },
      //     (error) => {
      //       console.log("something went wrong: ", error)
      //     }
      //   )
        // this.navCtrl.push(HomePage);
      // },
      // (err) => {
      //   console.log("got an error: ", err);
      //   this.loginErrMsg = err.error.error_description;
      //
      // }
    }
    )
  }

}
