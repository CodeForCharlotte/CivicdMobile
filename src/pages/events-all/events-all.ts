import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { EventsSelectedPage } from "../events-selected/events-selected";
import { EventFilterService } from "../../services/event-filter.service";


@IonicPage()
@Component({
  selector: 'page-events-all',
  templateUrl: 'events-all.html',
})
export class EventsAllPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              private eventFilterService: EventFilterService) { }

  showSuggEvents = false;
  showMyEvents = false;
  showAllEvents = false;
  showFilterEvents = false;
  searchBarSelected = false;
  searchArr = [];
  suggestedEventsArr = [];
  myEventsArr = [];
  matchedEventTitleArr = [];
  matchedOrgTitleArr = [];
  filterEventArr = [];

  myInput = "";


  // array to store user info
  currentUserInfo = {
    Email: "jsander112@hotmail.com",
    FirstName: "John",
    LastName: "Sander",
    DisplayName: "John Sander",
    ProfileDescription: "",
    StreetAddressOne: "5951 Gate Post Road",
    StreetAddressTwo: "",
    City: "Charlotte",
    State: "NC",
    ZipCode: "28211",
    Tags: [{Name: "Transit"}, {Name:"Privacy"}, {Name:"Civil Rights"}, {Name:"Police"}, {Name:"Feminism"}, {Name:"Inequality"}]
  };

  // array to store all events

  allEventsArr = [
    {
    OrganizationUserName: "Reps For All",
    DisplayTitle: "Republican Meetup",
    Description: "dfjklsjdfkljsdfkljlkja;lkj sdjfkljs dflkj lskdjfkl sjdflj skldjflks dfjlk fdlsjkdf sdlkjflk sdlkfjlksjdf sdfkljs df lkjsdf",
    CategoryName:"Rally/protest",
    StartTime: "2016-01-20T19:00:00+0000",
    EndTime: "1/3/17",
    AddressDisplayName: "The Mac House",
    StreetAddressOne: "825 International Drive",
    StreetAddressTwo: "Apt L",
    City: "Charlotte",
    State: "NC",
    Zip: "28270",
    Tags: [{Name: "Liberal"}, {Name:"Conservative"}, {Name:"Moderate"}, {Name:"Activism"}],
    ImageUrl: "assets/imgs/handshake.jpg"
    },
    {
    OrganizationUserName: "Dems For All",
    DisplayTitle: "Dem Meetup",
    Description: "Dems Dems Dems Dems Demmmmms Dems Dems",
    CategoryName:"Community Meeting",
    StartTime: "2016-01-20T19:00:00+0000",
    EndTime: "2/18/17",
    AddressDisplayName: "The Gate Post House",
    StreetAddressOne: "5951 Gate Post Rd",
    StreetAddressTwo: "",
    City: "Charlotte",
    State: "NC",
    Zip: "28211",
    Tags: [{Name: "Transit"}, {Name:"Feminism"}, {Name:"Civil Rights"}, {Name:"Town Hall"}],
    ImageUrl: "assets/imgs/handshake.jpg"
    },
    {
    OrganizationUserName: "Libs For Everyone",
    DisplayTitle: "Libs Meetup",
    Description: "Libss Libss Libss Libss Libsmmmms Libss Libss",
    CategoryName:"informational meeting",
    StartTime: "2016-01-20T19:00:00+0000",
    EndTime: "3/18/17",
    AddressDisplayName: "The Lib House",
    StreetAddressOne: "9166 Bonnie Briar Circle",
    StreetAddressTwo: "",
    City: "Charlotte",
    State: "NC",
    Zip: "28277",
    Tags: [{Name: "Taxes"}, {Name: "Moderate"}, {Name:"Voting Rights"}, {Name:"Inequality"}],
    ImageUrl: "assets/imgs/handshake.jpg"
    },
    {
    OrganizationUserName: "Education For Us",
    DisplayTitle: "Ed Meetup",
    Description: "Eds Eds Eds Eds Edmmmms Eds Eds",
    CategoryName:"school meeting",
    StartTime: "2016-01-20T19:00:00+0000",
    EndTime: "3/18/17",
    AddressDisplayName: "Hygge CoWorking",
    StreetAddressOne: "1776 Statesville Ave",
    StreetAddressTwo: "",
    City: "Charlotte",
    State: "NC",
    Zip: "28206",
    Tags: [{Name: "Police"}, {Name:"Privacy"}, {Name:"Nutrition"}],
    ImageUrl: "assets/imgs/handshake.jpg"
    },
    {
    OrganizationUserName: "Guns For Us",
    DisplayTitle: "Guns Meetup",
    Description: "Gunss Gunss Gunss Gunss Gunsmmmms Gunss Gunss",
    CategoryName:"independent activity",
    StartTime: "2016-01-20T19:00:00+0000",
    EndTime: "4/18/17",
    AddressDisplayName: "The Gun House",
    StreetAddressOne: "1111 Gun Rd",
    StreetAddressTwo: "",
    City: "Matthews",
    State: "NC",
    Zip: "564245",
    Tags: [{Name: "Social Media"}, {Name:"Grass Roots"}, {Name:"Socialism"}],
    ImageUrl: "assets/imgs/handshake.jpg"
    }
 ];

  ionViewDidLoad() {
    // call function to load the suggestedEventsArr when the page first loads
    this.getSuggestedEvents();
    this.eventFilterService.eventFilterInfo.subscribe(
        (filterInfo: any) => {
          this.filterEventArr = [];
          console.log("here is the filter info ", filterInfo);
          for (var i = 0; i < this.allEventsArr.length; i++) {
            //code for adding event from type filter to filterEventArray
            for (var j = 0; j < filterInfo.typeArr.length; j++) {
              if(this.allEventsArr[i].CategoryName.toLowerCase() == filterInfo.typeArr[j].toLowerCase()) {
                this.filterEventArr.push(this.allEventsArr[i]);
              }
            }
            // code for getting adding events from tag filter to filterEventArray
            for (var m = 0; m < this.allEventsArr[i].Tags.length; m++) {
              for (var n = 0; n < filterInfo.tagArr.length; n++) {
                if(this.allEventsArr[i].Tags[m].Name.toLowerCase() == filterInfo.tagArr[n].toLowerCase()) {
                  this.filterEventArr.push(this.allEventsArr[i]);
                }
              }
            }

          }
          console.log("here is the filter array after type: ", this.filterEventArr);
          if (this.filterEventArr.length > 0) {
            this.showFilterEvents = true;
          } else {
            this.showFilterEvents = false;
          }
          this.removeFilterDups();
        }
      );
  }

  toggleFilterMenu() {
    this.menuCtrl.toggle("filterMenu")
  }



  //Start Searchbar methods

  //function being ran during each event like a keystrok in the search input field.
  onInput(event) {
    console.log("Got Input");
    let val = event.target.value;
    console.log("value", event.target.value);
    //if statement is to prevent the array being rest when we are doing a cancel event.
    if (val != undefined) {
    this.setSearchItems();
    }
    //checks to remove tags that do not match the string entered in the search input.
    if (val && val.trim() !== '') {
      this.searchBarSelected = true;
      this.matchedEventTitleArr = this.searchArr.filter(function(item) {
        return item.DisplayTitle.toLowerCase().includes(val.toLowerCase());
      });
      this.matchedOrgTitleArr = this.searchArr.filter(function(item) {
        return item.OrganizationUserName.toLowerCase().includes(val.toLowerCase());
      });
      console.log("got here", this.matchedEventTitleArr);
      console.log(this.matchedOrgTitleArr);
    } else {
      this.matchedEventTitleArr = [];
      this.matchedOrgTitleArr = [];
      this.searchBarSelected = false;
    }
  }

  setSearchItems() {
    //for putting the tags in the array that the search bar is pulling from.
    this.searchArr = [];
    for (var i = 0; i < this.allEventsArr.length; i++) {
      this.searchArr.push(this.allEventsArr[i]);
    }
  }

  onCancel() {
    this.searchArr = [];
    this.matchedEventTitleArr = [];
    this.matchedOrgTitleArr = [];
    this.searchBarSelected = false;
    console.log("GOT CANCEL");
  }
  onBlur() {
    //use set timeout function to move reset from blur event to bottom of call stack so button clicks can work
    setTimeout(() => {
      this.searchArr = [];
      this.matchedEventTitleArr = [];
      this.matchedOrgTitleArr = [];
      this.searchBarSelected = false;
    }, 0);
    this.myInput = "";

  }

  //END SEARCHBAR METHODS

  //function for loading the selected events array
  getSuggestedEvents() {
    for (var i = 0; i < this.allEventsArr.length; i++) {
      for (var j = 0; j < this.allEventsArr[i].Tags.length; j++) {
        for (var k = 0; k < this.currentUserInfo.Tags.length; k++) {
          //conditional to find suggested Events based on having the same tags
          if(this.allEventsArr[i].Tags[j].Name == this.currentUserInfo.Tags[k].Name) {
            this.suggestedEventsArr.push(this.allEventsArr[i]);
          }
        }
      }
    }
    //filter out duplicates of events that have multiple user tags
    this.removeSuggestedDups()
  }

  removeSuggestedDups() {
    this.suggestedEventsArr = this.suggestedEventsArr.filter((elem, index, self) => {
          return index == self.indexOf(elem);
    });
  }

  removeFilterDups() {
    this.filterEventArr = this.filterEventArr.filter((elem, index, self) => {
          return index == self.indexOf(elem);
    });
  }

  // loads an object with info from selected event and sends it with transition to events-selected page
  selectEvent(event) {
  console.log("eventselected");
    this.navCtrl.push(EventsSelectedPage, {
      OrganizationUserName: event.OrganizationUserName,
      DisplayTitle: event.DisplayTitle,
      Description: event.Description,
      CategoryName: event.CategoryName,
      StartTime: event.StartTime,
      EndTime: event.EndTime,
      AddressDisplayName: event.AddressDisplayName,
      StreetAddressOne: event.StreetAddressOne,
      StreetAddressTwo: event.StreetAddressTwo,
      City: event.City,
      State: event.State,
      Zip: event.Zip,
      Tags: event.Tags,
      ImageUrl: event.ImageUrl
    })
  }

}
