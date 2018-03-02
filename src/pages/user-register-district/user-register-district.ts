import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserRegisterFinalPage } from "../user-register-final/user-register-final";
import { RegisterService } from "../../services/register.service";
import { DataVoterInfoService } from "../../services/data-voter-info.service";

@Injectable()
@IonicPage()
@Component({
  selector: 'page-user-register-district',
  templateUrl: 'user-register-district.html',
})

export class UserRegisterDistrictPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private registerService: RegisterService,
              public viewCtrl: ViewController,
              private dataVoterInfoService: DataVoterInfoService) {}


  userAddressOne = this.registerService.getUserAddressOne();
  userAddressTwo = this.registerService.getUserAddressTwo();
  userCity = this.registerService.getUserCity();
  userState = this.registerService.getUserState();
  userZip = this.registerService.getUserZip();
  fromFinal = false;

  //test address
  userAddress = "612 Abbey Rd. Lindale TX";

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegisterDistrictPage');
    this.getRepInfo(this.userAddress);

  }
  ionViewWillEnter() {
    if(this.navParams.get("noBack")) {
        this.viewCtrl.showBackButton(false);
        this.fromFinal = true;
        console.log(this.fromFinal);
      }
    }

  swipeRightEvent(form) {
    if (form.valid) {
      this.registerService.addUserAddress(form.value.userAddressOne, form.value.userAddressTwo, form.value.userCity, form.value.userState, form.value.userZip);
      this.navCtrl.push(UserRegisterFinalPage, {}, {animate: true, animation: "ios-transition", direction: "forward", duration: 1000 });
    }
  }
  goBack() {
    this.navCtrl.pop({animate: true, animation: "ios-transition"});
  }

  //start test district calls using google API.  This will be moved when we figure out how we are handling upcoming elections.

  voteAreas = [];
  electionArr = [];
  electionActivities = [];

  getRepInfo(address) {
    this.dataVoterInfoService.getRepInfo(address)
      .subscribe(
        (repInfo: any) => {
          console.log(repInfo);
          for (var key in repInfo.divisions) {
            if (repInfo.divisions.hasOwnProperty(key)) {
              this.voteAreas.push(key);
            }
          }
          this.getElectionInfo();
        },
        (error) => console.log(error)
        );
  }

  getElectionInfo() {
    this.dataVoterInfoService.getElectionInfo()
      .subscribe(
        (electionInfo: any) => {
          console.log(electionInfo);
          for (var i = 0; i < electionInfo.elections.length; i++) {
            for (var j = 0; j < this.voteAreas.length; j++) {
              if (electionInfo.elections[i].ocdDivisionId == this.voteAreas[j]) {
                this.electionArr.push(electionInfo.elections[i].id);
              }
            }
          }
          //removing election id 2000 since it is the google test id
          this.electionArr = this.electionArr.filter(id => id != 2000);
          this.getUserVoteInfo();
        },
        (error) => console.log(error)
        );
  }



  getUserVoteInfo() {
    for(var i = 0; i < this.electionArr.length; i++) {
      this.dataVoterInfoService.getUserVoteInfo(this.userAddress, this.electionArr[i])
      .subscribe(
        (userVoteInfo: any) => {
          this.electionActivities.push(userVoteInfo);
        },
        (error) => console.log(error)
      )
    }
    console.log(this.electionActivities);

  }


  testFunction() {
    this.dataVoterInfoService.testFunction(this.userAddress)
    .subscribe(
      (userVoteInfo: any) => {
        console.log("TEST RESPONSE: ", userVoteInfo);
      },
      (error) => console.log(error)
    )
  }

}
