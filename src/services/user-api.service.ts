import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenManagerService } from "./token-manager.service";

@Injectable()

export class UserApiService {

constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  userInfo: object;

  createUser(info) {

    return this.http.post("http://millennialsvote.azurewebsites.net/api/users", info, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }


  logInUser(userName, passDigest) {
    let info = {
      'grant_type': 'password',
      'username': 'civicdgroup@mailinator.com',
      'password': 'Password1!'
    };

    let otherInfo = "grant_type=password&username="+ userName + "&password=" + passDigest;
    console.log("OTHER INFO", otherInfo);
    return this.http.post("http://millennialsvote.azurewebsites.net/token", otherInfo, {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }


  // getUserInfo(email) {
  //   let token = this.tokenManagerService.retrieveToken();
  //   console.log("service token: ", token);
  //   return this.http.get(`http://millennialsvote.azurewebsites.net/api/users/${email}`, {headers: new HttpHeaders().set('Authorization', `bearer${token}`)});
  // }

  getUserInfo() {
    let userEmail = this.tokenManagerService.getUserFromToken()
    let token = this.tokenManagerService.retrieveToken();
    let bearToken = "bearer " + token;

    return this.http.get("http://millennialsvote.azurewebsites.net/api/users/" + userEmail + "/", {headers: new HttpHeaders({'Authorization': "Bearer " + token})});

  }

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
      this.getUserInfo()
      .subscribe(
        (data) => {
          console.log("got user info", data);
          this.userInfo = data;
          return true
        },
        (err) => {
          console.log("there was an error getting the user info", err)
          return false;
        }
      )

    }
  }


}
