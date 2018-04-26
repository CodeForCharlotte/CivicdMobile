import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-org-post-event',
  templateUrl: 'org-post-event.html',
})
export class OrgPostEventPage {

  placeImage= "";
  imageLoad = false;
  imageUploaded = false;
  allTagsArr = ["Liberal", "Conservative", "Moderate", "Activism", "Transit", "Feminism", "Civil Rights", "Town Hall", "Net Neutrality", "Taxes", "Voting Rights", "Inequality", "Income Gap", "Socialism", "Libertarism", "Affordable Housing", "Healthcare", "Obesity", "Mental Health", "Entitlements", "Police", "Privacy", "Internet Connectivity", "Nutrition", "Social Media", "Grassroots", "Small Business"];
  searchArr = [];
  selectedTagsArr = [];
  myInput = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private datePicker: DatePicker,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgPostEventPage');
    this.eventDate = "";
  }

  eventDate;

  selectDate() {
    this.datePicker.show({
  titleText: "Select Event Date",
  date: new Date(),
  mode: 'datetime',
  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
}).then(
  date => {
     console.log('Got date: ', date);
     this.eventDate = date;

  },
  err => {
    console.log("Got Error: ", err)
  }
);
  }

  // This function creates an action sheet with buttons for getting an image from phone library or taking one with the camera on their phone.
  uploadPic() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: "From Library",
          icon: "folder",
          handler: () => {
            this.imageLoad = true;
            const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: 0
            }

            this.camera.getPicture(options).then((imageData) => {
             // imageData is either a base64 encoded string or a file URI
             // If it's base64:
             console.log("image data: ", imageData);
             let base64Image = 'data:image/jpeg;base64,' + imageData;
             console.log("Base64Img: ", base64Image);
             this.placeImage = base64Image;
             this.imageLoad = false;
             this.imageUploaded = true;
            }, (err) => {
             // Handle error
             console.log("got an error", err);
             this.imageLoad = false;
            });
          }
        },
        {
          text: "From Camera",
          icon: "camera",
          handler: () => {
            this.imageLoad = true;
            const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: 1,
            allowEdit: true
            }

            this.camera.getPicture(options).then((imageData) => {
             // imageData is either a base64 encoded string or a file URI
             // If it's base64:
             console.log("image data: ", imageData);
             let base64Image = 'data:image/jpeg;base64,' + imageData;
             console.log("Base64Img: ", base64Image);
             this.placeImage = base64Image;
             this.imageLoad = false;
             this.imageUploaded = true;
            }, (err) => {
             // Handle error
             console.log("got an error", err);
             this.imageLoad = false;
            });
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

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
        return;
      }
    }
    this.selectedTagsArr.push(tag);
    this.searchArr=[];
  }

  isActive(tag) {
    //add or remove class depending on if the tag has been selected. set to tags displayed at the top of the page.
    for (var i = 0; i < this.selectedTagsArr.length; i++) {
      if (tag == this.selectedTagsArr[i]) {
        return true;
      }
    }
      return false;
  }

  submitEvent(form) {
    var postEventObj = {
      OrganizationUserName: "Kemba Walker",
      DisplayTitle: form.value.eventName,
      Description: form.value.eventDescription,
      CategoryName: form.value.eventType,
      StartTime: this.eventDate,
      AddressDisplayName: form.value.locationTitle,
      StreetAddressOne: form.value.eventAddress,
      StreetAddressTwo: form.value.eventAddressTwo,
      City: form.value.eventCity,
      State: form.value.eventState,
      ZipCode: form.value.eventZip,
      Website: form.value.eventWebsite,


    }


  }

}
