import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserRegisterDistrictPage } from "../user-register-district/user-register-district";
import { RegisterService } from "../../services/register.service";
import { UserRegisterFinalPage } from"../user-register-final/user-register-final";
import { UserApiService } from "../../services/user-api.service";

@IonicPage()
@Component({
  selector: 'page-user-register-about',
  templateUrl: 'user-register-about.html',
})
export class UserRegisterAboutPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private registerService: RegisterService,
              public viewCtrl: ViewController,
              private userApiService: UserApiService) {
  }

  aboutInfo = this.registerService.getUserAbout();

  userName = "";
  firstName = "";
  lastName = "";
  userAbout = "";
  updatingInfo = false;
  isFinal = this.navParams.get("final");
  currentUser = this.userApiService.isLoggedIn();


  ngOnInit() {
    console.log("GETTING HERE NGONIT")
    console.log('current user on about', this.currentUser)
  }

   ionViewDidLoad() {

    if(this.currentUser) {
      this.userApiService.user$.subscribe(
        (data: any) => {
          console.log("GETTING HERE NOW", this.currentUser)
          this.userName = data.DisplayName;
          this.userAbout = data.ProfileDescription;
          this.firstName = data.FirstName;
          this.lastName = data.LastName;
        }
      )
    } else {
      this.userName = this.aboutInfo.userName;
      this.userAbout = this.aboutInfo.about;
      this.firstName = this.aboutInfo.firstName;
      this.lastName = this.aboutInfo.lastName;
    }
  }

  ionViewWillEnter() {
    if(this.navParams.get("noBack"))
        this.viewCtrl.showBackButton(false);
    }

  swipeRightEvent(form) {
    console.log("FORM INFO", form.value);
    if (form.valid) {
      console.log("CURRENT USER", this.currentUser)
      if(this.currentUser) {
        this.updatingInfo = true;
        const aboutObj = {
          DisplayName: this.userName,
          ProfileDescription: this.userAbout,
          FirstName: this.firstName,
          LastName: this.lastName
        }
        console.log("ABOUT OBJ", aboutObj)
        this.userApiService.updateUser(aboutObj)
        .subscribe(
          (data) => {
            console.log("user updated", data)
            this.navCtrl.push(UserRegisterFinalPage, {}, {animate: true, animation: "ios-transition", direction: "forward"});
            this.updatingInfo = false;
          },
          (err) => {
            console.log("there was an error updating the user", err);
            this.updatingInfo = false;
          }
        )
        return;
      }
      this.registerService.addUserInfo(form.value.firstName, form.value.lastName, form.value.userName, form.value.userAbout);
      if(this.isFinal === true) {
      this.navCtrl.push(UserRegisterFinalPage, {}, {animate: true, animation: "ios-transition", direction: "forward"});
      } else {
      this.navCtrl.push(UserRegisterDistrictPage, {}, {animate: true, animation: "ios-transition", direction: "forward"});
      }
    }
  }
  goBack() {
    this.navCtrl.pop({animate: true, animation: "ios-transition"});
  }


}
