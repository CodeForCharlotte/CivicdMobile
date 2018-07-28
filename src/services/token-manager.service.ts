import { Injectable, Injector } from '@angular/core';




@Injectable()

export class TokenManagerService {

constructor() {}



private tokenKey:string = 'app_token';

  private storeToken(content:Object) {
      localStorage.setItem(this.tokenKey, JSON.stringify(content));
  }

  public createToken (content: Object) {
    this.storeToken(content);
  }

  private retrieve() {
      let storedToken = localStorage.getItem(this.tokenKey);
      if(!storedToken) throw 'no token found';
      return storedToken;
  }

  public getUserFromToken() {
    let currentToken = JSON.parse(this.retrieve());
    let tokenUser = currentToken.userName;
    return tokenUser;
  }


  public retrieveToken() {

      let currentTime:number = (new Date()).getTime(), token = null;
      try {
          let storedToken = JSON.parse(this.retrieve());
          if(storedToken.expires < currentTime) throw 'invalid token found';
          token = storedToken.access_token;
      }
      catch(err) {
          console.error(err);
      }
      return token;

  }

}
