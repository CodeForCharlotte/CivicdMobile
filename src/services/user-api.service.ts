import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenManagerService } from "./token-manager.service";

@Injectable()

export class UserApiService {

constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  userInfo = {
    userName: "civicdgroup@mailinator.com",
    Email: "civicdgroup@mailinator.com",
    FirstName: "Kemba",
    LastName: "Walker",
    DisplayName: "Kemba Walker",
    ProfileDescription: "GOOOOOOOOO HORNETS!!!!!!!!!!!!!!!!",
    StreetAddressOne: "5951 Champions Drive",
    StreetAddressTwo: "",
    City: "Charlotte",
    State: "North Carolina",
    ZipCode: "28211",
    Tags: [{Name: "Transit"}, {Name:"Privacy"}, {Name:"Civil Rights"}, {Name:"Police"}, {Name:"Feminism"}, {Name:"Inequality"}],
  }


  logInUser() {
    let info = {
      'grant_type': 'password',
      'username': 'civicdgroup@mailinator.com',
      'password': 'Password1!'
    };

    let otherInfo = "grant_type=password&username=civicdgroup@mailinator.com&password=Password1!";
    return this.http.post("http://millennialsvote.azurewebsites.net/token", otherInfo, {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }

  // getUserInfo(email) {
  //   let token = this.tokenManagerService.retrieveToken();
  //   console.log("service token: ", token);
  //   return this.http.get(`http://millennialsvote.azurewebsites.net/api/users/${email}`, {headers: new HttpHeaders().set('Authorization', `bearer${token}`)});
  // }

  setUserInfo(info) {
    this.userInfo = info;
  }

  returnUserInfo() {
    return this.userInfo;
  }

  isLoggedIn() {
    let testToken = this.tokenManagerService.retrieveToken();
    console.log("token: ", testToken);
    if (testToken == undefined || testToken === "invalid token found" || testToken === "no token found" ) {
      return false;
    } else {
      return true;
    }
  }


}
