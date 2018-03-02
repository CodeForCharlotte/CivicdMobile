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

}
