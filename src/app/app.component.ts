import { Component, ViewChild } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, MenuController } from "ionic-angular";
import { UserLoginPage } from '../pages/user-login/user-login';
import { UserRegisterTypePage } from "../pages/user-register-type/user-register-type";
import { UserRegisterAuthInfoPage } from "../pages/user-register-auth-info/user-register-auth-info";
import { EventsAllPage } from "../pages/events-all/events-all";
import { HomePage } from "../pages/home/home";
import { UserRegisterInterestsPage } from "../pages/user-register-interests/user-register-interests";
import { UserRegisterAboutPage } from "../pages/user-register-about/user-register-about";
import { UserRegisterDistrictPage } from "../pages/user-register-district/user-register-district";
import { UserRegisterFinalPage } from "../pages/user-register-final/user-register-final";
import { OrgInviteRequestPage } from "../pages/org-invite-request/org-invite-request";
import { OrgPostEventPage } from "../pages/org-post-event/org-post-event";
import { EventsSelectedPage } from "../pages/events-selected/events-selected";
import { EventFilterService } from "../services/event-filter.service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  loginPage = UserLoginPage;
  eventsPage = EventsAllPage;
  homePage = HomePage;
  interestsPage = UserRegisterInterestsPage;
  aboutPage = UserRegisterAboutPage;
  districtPage = UserRegisterDistrictPage;
  finalPage = UserRegisterFinalPage;
  authPage = UserRegisterAuthInfoPage;
  orgInviteRequestPage = OrgInviteRequestPage;
  postEventPage = OrgPostEventPage;
  selectedEventPage = EventsSelectedPage;
  allTagsArr = ["Liberal", "Conservative", "Moderate", "Activism", "Transit", "Feminism", "Civil Rights", "Town Hall", "Net Neutrality", "Taxes", "Voting Rights", "Inequality", "Income Gap", "Socialism", "Libertarism", "Affordable Housing", "Healthcare", "Obesity", "Mental Health", "Entitlements", "Police", "Privacy", "Internet Connectivity", "Nutrition", "Social Media", "Grassroots", "Small Business"];
  searchArr = [];
  selectedTagsArr = [];
  myInput = "";
  @ViewChild('nav') nav: NavController;
  eventTypeArr = [
                  {
                    type: "Rally/Protest",
                    icon: "md-square-outline",
                    selected: false
                  },
                  {
                    type: "School Meeting",
                    icon: "md-square-outline",
                    selected: false
                  },
                  {
                    type: "Government Meeting",
                    icon: "md-square-outline",
                    selected: false
                  },
                  {
                    type: "Internal Organization Meeting",
                    icon: "md-square-outline",
                    selected: false
                  },
                  {
                    type: "Informational Meeting",
                    icon: "md-square-outline",
                    selected: false
                  },
                  {
                    type: "Community Meeting",
                    icon: "md-square-outline",
                    selected: false
                  },
                  {
                    type: "Independent Activity",
                    icon: "md-square-outline",
                    selected: false
                  }
                ];
  selectedEventTypeArr = [];
  selectedEventTagArr = [];
  typeIconName = "md-square-outline"



  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              app: App,
              private menuCtrl: MenuController,
              private eventFilterService: EventFilterService) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.push(page);
    this.menuCtrl.close();
  }

  selectEventType(event) {
    console.log(event);
    if(!event.selected) {
      event.icon = "md-checkbox-outline";
      event.selected = true;
    } else {
      event.icon = "md-square-outline";
      event.selected = false;
    }
    let newArrayValue = [];
    for (var i = 0; i < this.eventTypeArr.length; i++) {
      if(this.eventTypeArr[i].selected) {
        newArrayValue.push(this.eventTypeArr[i].type);
      }
    }
    this.selectedEventTypeArr = newArrayValue;
    this.sendFilterInfo();

  }

  updateSelectedTypes(event) {
    console.log(event);
    this.selectedEventTypeArr = event;
    console.log(this.selectedEventTypeArr);

  }

  sendFilterInfo() {
    let filterInfo = {
      typeArr: this.selectedEventTypeArr,
      tagArr: this.selectedEventTagArr
    };
    console.log(filterInfo.typeArr);

    this.eventFilterService.eventFilterInfo.next(filterInfo);
  }

  //start tag searchbar Code
  setSearchItems() {
    //for putting the tags in the array that the search bar is pulling from.
    this.searchArr = [];
    for (var i = 0; i < this.allTagsArr.length; i++) {
      this.searchArr.push(this.allTagsArr[i]);
    }
    //removes tags that have already been selected from the search array.
    for(var j = 0; j < this.selectedTagsArr.length; j++) {
      this.searchArr = this.searchArr.filter((index) => index != this.selectedTagsArr[j]);
    }
  }

  //function being ran during each event like a keystrok in the search input field.
  onInput(event) {
    console.log("Got Input");
    let val = event.target.value;
    console.log(event.target.value);
    //if statement is to prevent the array being reset when we are doing a cancel event.
    if (val != undefined) {
    this.setSearchItems();
    }
    //checks to remove tags that do not match the string entered in the search input.
    if (val && val.trim() !== '') {
      this.searchArr = this.searchArr.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
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

  addTag(tag) {
    for (var i = 0; i < this.selectedTagsArr.length; i++) {
      if (tag == this.selectedTagsArr[i]) {
        var newSelectArray = this.selectedTagsArr.filter((index) => index != tag);
        this.selectedTagsArr = newSelectArray;
        this.selectedEventTagArr = this.selectedTagsArr;
        this.sendFilterInfo();
        return;
      }
    }
    this.selectedTagsArr.push(tag);
    this.selectedEventTagArr = this.selectedTagsArr;

    this.searchArr=[];
    this.sendFilterInfo();
  }


}
