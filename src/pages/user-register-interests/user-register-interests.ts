import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {UserRegisterAboutPage } from "../user-register-about/user-register-about";
import { UserRegisterFinalPage } from "../user-register-final/user-register-final";
import { RegisterService } from "../../services/register.service";
import { TagsApiService } from "../../services/tags-api.service";
import { UserApiService } from "../../services/user-api.service";

@IonicPage()
@Component({
  selector: 'page-user-register-interests',
  templateUrl: 'user-register-interests.html',
})
export class UserRegisterInterestsPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private registerService: RegisterService,
              public viewCtrl: ViewController,
              private tagsApiService: TagsApiService,
              private userApiService: UserApiService) {
  }



  aboutPage = UserRegisterAboutPage;
  allTagsArr = [];
  firstColArr = [];
  secondColArr = [];
  thirdColArr = [];
  searchArr = [];
  myInput = "";
  selectedInterestArr = [];
  isFinal = this.navParams.get("final");
  currentUser;
  userInfo;


  ionViewDidLoad() {
    console.log("INTERESTS ION VIEW LOADED")


  }

   ngOnInit() {
    // load the three column array for displaying popular tags
    this.currentUser = this.userApiService.isLoggedIn();
    console.log("IS LOGGED IN", this.currentUser);
    if(this.currentUser) {
      this.userApiService.user$.subscribe(
        (data: any) => {
          this.selectedInterestArr = data.Tags;
          this.userInfo = data;
          console.log("USER TAGS", this.selectedInterestArr);
        },
        (err) => console.log("There was an error getting the user info", err)
      )
    } else {
      this.selectedInterestArr = this.registerService.getUserTags();
    }
    this.tagsApiService.getTags()
    .subscribe(
      (tagInfo: any) => {
        this.allTagsArr = tagInfo;
        this.firstColArr = [];
        this.secondColArr = [];
        this.thirdColArr = [];
        for (var i = 0; i < 9; i = i + 3) {
          this.firstColArr.push(this.allTagsArr[i]);
          if(this.allTagsArr[i + 1]) {
            this.secondColArr.push(this.allTagsArr[i + 1]);
          }
          if(this.allTagsArr[i + 2]) {
            this.thirdColArr.push(this.allTagsArr[i + 2]);
          }
        }
      },
      (err) => console.log("there was an error getting the tags", err)
    )
  }
  ionViewWillEnter() {
    // remove back button from navbar
    this.viewCtrl.showBackButton(false);
  }
  isActive(tag) {
    //add or remove class depending on if the tag has been selected. set to tags displayed at the top of the page.
    for (var i = 0; i < this.selectedInterestArr.length; i++) {
      if (tag == this.selectedInterestArr[i]) {
        return true;
      }
    }
      return false;
  }

  checkIndex(index) {
    //this is being applied to the selected tag display to the extra top margin is not added to the first tag.
    if (index == 0) {
      return false;
    } else {
      return true;
    }
  }


  selectTag(tag) {
    //function for selecting tags to add or remove them to the selected interest array
    for (var i = 0; i < this.selectedInterestArr.length; i++) {
      if (tag == this.selectedInterestArr[i]) {
        var newSelectArray = this.selectedInterestArr.filter((index) => index != tag);
        this.selectedInterestArr = newSelectArray;
        return;
      }
    }
    this.selectedInterestArr.push(tag);
  }

  setSearchItems() {
    //for putting the tags in the array that the search bar is pulling from.
    this.searchArr = [];
    for (var i = 9; i < this.allTagsArr.length; i++) {
      this.searchArr.push(this.allTagsArr[i]);
    }
    //removes tags that have already been selected from the search array.
    for(var j = 0; j < this.selectedInterestArr.length; j++) {
      this.searchArr = this.searchArr.filter((index) => index != this.selectedInterestArr[j]);
    }
  }

  //function being ran during each event like a keystrok in the search input field.
  onInput(event) {
    console.log("Got Input");
    let val = event.target.value;
    console.log(event.target.value);
    //if statement is to prevent the array being rest when we are doing a cancel event.
    if (val != undefined) {
    this.setSearchItems();
    }
    //checks to remove tags that do not match the string entered in the search input.
    if (val && val.trim() !== '') {
      this.searchArr = this.searchArr.filter(function(item) {
        return item.Name.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  onCancel() {
    this.searchArr = [];
    console.log("GOT CANCEL");
  }
  onBlur() {
    setTimeout(() => {this.searchArr = []}, 0);
    this.myInput = "";
  }

  addSearchTag(tag) {
    for (var i = 0; i < this.selectedInterestArr.length; i++) {
      if (tag == this.selectedInterestArr[i]) {
        var newSelectArray = this.selectedInterestArr.filter((index) => index != tag);
        this.selectedInterestArr = newSelectArray;
        return;
      }
    }
    this.selectedInterestArr.push(tag);
    this.searchArr=[];
  }

  swipeRightEvent() {
    if (this.selectedInterestArr.length > 0 && !this.currentUser) {
      this.registerService.addUserTags(this.selectedInterestArr);
      if(this.isFinal === true) {
      this.navCtrl.push(UserRegisterFinalPage, {}, {animate: true, animation: "ios-transition", direction: "forward"});
      } else {
      this.navCtrl.push(UserRegisterAboutPage, {}, {animate: true, animation: "ios-transition", direction: "forward"});
      }
    } else if(this.currentUser) {
      this.userInfo.Tags = this.selectedInterestArr;
      const tagsObj = {
        Tags: this.selectedInterestArr
      }
      this.userApiService.updateUser(tagsObj)
      .subscribe(
        (data) => {
          console.log("user updated", data)
        },
        (err) => console.log("there was an error updating the user", err)
      )
    }
  }

  skipTags() {
    if(this.isFinal === true) {
      this.registerService.addUserTags([]);
    this.navCtrl.push(UserRegisterFinalPage, {}, {animate: true, animation: "ios-transition", direction: "forward"});
    } else {
    this.navCtrl.push(UserRegisterAboutPage, {}, {animate: true, animation: "ios-transition", direction: "forward"});
    }
  }

  goBack() {
    this.navCtrl.pop({animate: true, animation: "ios-transition"});
  }



}
