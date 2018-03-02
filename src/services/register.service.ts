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

  addUserTags(tags) {
    this.userTagsArr = [];
    for (var i = 0; i < tags.length; i++) {
      this.userTagsArr.push(tags[i]);
    }
    console.log(this.userTagsArr);
  }

  addUserInfo(name, about) {
    this.userName = name;
    this.userAbout = about;
    console.log(this.userName);
    console.log(this.userAbout);
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
      userName: this.userName,
      userAbout: this.userAbout,
      userTags: this.userTagsArr,
      addressOne: this.userAddressOne,
      addressTwo: this.userAddressTwo,
      city: this.userCity,
      state: this.userState,
      zip: this.userZip
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
      name: this.userName,
      about: this.userAbout
    }
    return aboutObj;
  }

  resetUserInfo() {
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
