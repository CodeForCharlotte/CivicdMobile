//Service for storing user information during the registration process before submitting to database.

export class RegisterService {
  userName = "";
  userAbout = "";
  userTagsArr = [];
  userAddressOne = "";
  userAddressTwo = "";
  userCity = "";
  userState = "";
  userZip = "";
  firstName = "";
  lastName = "";
  userEmail = "";
  userPass = "";

  addUserTags(tags) {
    this.userTagsArr = [];
    for (var i = 0; i < tags.length; i++) {
      this.userTagsArr.push(tags[i]);
    }
    console.log(this.userTagsArr);
  }

  addAuthInfo(info) {
    this.userEmail = info.email;
    this.userPass = info.pass;
  }

  addUserInfo(firstName, lastName, userName, about) {
    console.log("FIRST NAME", firstName);
    console.log("Last name", lastName);
    console.log("USer name", userName);
    console.log("about", about);
    this.firstName = firstName;
    this.lastName = lastName
    this.userName = userName;
    this.userAbout = about;
  }

  addUserAddress(addressOne, addressTwo, city, state, zip) {
    this.userAddressOne = addressOne;
    this.userAddressTwo = addressTwo;
    this.userCity = city;
    this.userState = state;
    this.userZip = zip;
  }

  getUserInfo() {
    var userObj = {
      Email: this.userEmail,
      Password: this.userPass,
      FirstName: this.firstName,
      LastName: this.lastName,
      DisplayName: this.userName,
      ProfileDescription: this.userAbout,
      Tags: this.userTagsArr,
      Category: 0,
      StreetAddressOne: this.userAddressOne,
      StreetAddressTwo: this.userAddressTwo,
      City: this.userCity,
      State: this.userState,
      Zip: this.userZip
    };
    return userObj;
  }

  getUserTags() {
    return this.userTagsArr;
  }
  getUserAddressOne() {
    return this.userAddressOne
  }
  getUserAddressTwo() {
    return this.userAddressTwo
  }
  getUserCity() {
    return this.userCity
  }
  getUserState() {
    return this.userState
  }
  getUserZip() {
    return this.userZip
  }

  getUserAbout() {
    var aboutObj = {
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      about: this.userAbout,

    }
    return aboutObj;
  }

  resetUserInfo() {
    this.firstName = "";
    this.lastName = "";
    this.userName = "";
    this.userAbout = "";
    this.userTagsArr = [];
    this.userAddressOne = "";
    this.userAddressTwo = "";
    this.userCity = "";
    this.userState = "";
    this.userZip = "";

  }
}
