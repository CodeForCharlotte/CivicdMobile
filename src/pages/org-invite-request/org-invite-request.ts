import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {UserLoginPage} from "../user-login/user-login";
@IonicPage()
@Component({
  selector: 'page-org-invite-request',
  templateUrl: 'org-invite-request.html',
})
export class OrgInviteRequestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  loginPage = UserLoginPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgInviteRequestPage');
  }

  submitOrgInfo(form) {
    var orgInfo = form.value;

    console.log(orgInfo);
    let alert = this.alertCtrl.create({
      title: "Thank You!",
      subTitle: "We received your request and will follow up with you at " + form.value.Email + " once we review your information.",
      buttons: [{
        text: "OK",
        handler: () => {
          alert.dismiss().then(() => {
            this.navCtrl.pop();
          });
          return false;
        }
      }]
    });
    alert.present();
  }

}
