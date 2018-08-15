import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TagsApiService } from "../../services/tags-api.service";
import { UserApiService } from "../../services/user-api.service";

/**
 * Generated class for the AdminCreateOrgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-create-org',
  templateUrl: 'admin-create-org.html',
})
export class AdminCreateOrgPage {

  searchArr = [];
  myInput = "";
  submitBtnInfo = "Submit";
  successMsg = "";
  errMsg = "";
  allTagsArr = [];
  selectedInterestArr = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tagsApiService: TagsApiService,
              private userApiService: UserApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCreateOrgPage');
    this.tagsApiService.getTags()
    .subscribe(
      (data: any) => {
        this.allTagsArr = data;
      },
      (err) => console.log("there was an error getting the tags")
    )

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

  submitOrgInfo(form) {
    this.successMsg = "";
    this.errMsg = "";
    this.submitBtnInfo = "Submitting..."
    let formValue = form.value;
    formValue.Tags = this.selectedInterestArr;
    this.userApiService.createOrg(formValue)
    .subscribe(
      (data: any) => {
        console.log("org is created", data)
        this.successMsg = data.DisplayName + " created successfully!"
        this.submitBtnInfo = "Submit";
        form.reset();
      },
      (err) => {
        console.log("there was an error creating org", err)
        this.errMsg = "There was an error creating the organization"
        this.submitBtnInfo = "Submit";
      }
    )
  }

}
