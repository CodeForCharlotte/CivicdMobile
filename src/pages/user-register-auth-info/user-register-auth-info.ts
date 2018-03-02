import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UserLoginPage } from '../user-login/user-login';
import { UserRegisterInterestsPage } from "../user-register-interests/user-register-interests";
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-user-register-auth-info',
  templateUrl: 'user-register-auth-info.html',
})
export class UserRegisterAuthInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public actionSheetCtrl: ActionSheetController) {
  }
  formValid = false;
  loginPage = UserLoginPage;
  portfolioPic = "assets/imgs/default_portfolio.png"
  imageLoad = false;



  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegisterAuthInfoPage');
  }
  swipeRightEvent(form) {
    if (form.valid && !this.imageLoad) {
      this.navCtrl.push(UserRegisterInterestsPage, {}, {animate: true, animation: "ios-transition", direction: "forward" });
    }

  }
  goBack() {
    this.navCtrl.pop({animate: true, animation: "ios-transition"});
  }


// function for that generates action sheet for user to select image from library or take one with their camera
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
             this.portfolioPic = base64Image;
             this.imageLoad = false;
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
             this.portfolioPic = base64Image;
             this.imageLoad = false;
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
