import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsSelectedPage } from "../events-selected/events-selected";


@IonicPage()
@Component({
  selector: 'page-events-all',
  templateUrl: 'events-all.html',
})
export class EventsAllPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showSuggEvents = false;
  showMyEvents = false;
  showAllEvents = false;
  searchArr = [];
  suggestedEventsArr = [];
  myEventsArr = [];
  myInput;

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
    CategoryName:"Community",
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
    CategoryName:"information",
    StartTime: "2016-01-20T19:00:00+0000",
    EndTime: "3/18/17",
    AddressDisplayName: "The Lib House",
    StreetAddressOne: "9166 Bonnie Briar Circle",
    StreetAddressTwo: "",
    City: "Charlotte",
    State: "NC",
    Zip: "28277",
    Tags: [{Name: "Taxes"}, {Name:"Voting Rights"}, {Name:"Inequality"}],
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
    console.log('ionViewDidLoad EventsAllPage');
    // call function to load the suggestedEventsArr when the page first loads
    this.getSuggestedEvents();
  }

  //Start Searchbar methods

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
        return item.toLowerCase().includes(val.toLowerCase());
      });
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
    console.log("GOT CANCEL");
  }
  onBlur() {
    setTimeout(() => {this.searchArr = []}, 0);
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

  // loads an object with info from selected event and sends it with transition to events-selected page
  selectEvent(event) {
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
