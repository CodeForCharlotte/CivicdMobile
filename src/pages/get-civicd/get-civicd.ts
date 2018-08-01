import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserApiService } from "../../services/user-api.service";

/**
 * Generated class for the GetCivicdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-get-civicd',
  templateUrl: 'get-civicd.html',
})
export class GetCivicdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userApiService: UserApiService) {
  }
  userInfo: object;

  ionViewDidLoad() {
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

}
