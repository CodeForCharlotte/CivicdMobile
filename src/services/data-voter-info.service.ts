import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()

export class DataVoterInfoService {
  constructor(private _http: HttpClient) {}
  //test api service for google civic api.  calls are being made on user-register-district page
  key = "";



  getElectionInfo() {
    var searchType = "elections"
    return this._http.get("https://www.googleapis.com/civicinfo/v2/" + searchType + "?key=" + this.key);
  }

  getRepInfo(queryAddress) {
    var searchType = "representatives"
    return this._http.get("https://www.googleapis.com/civicinfo/v2/" + searchType + "?key=" + this.key + "&address=" + queryAddress);
  }

  getUserVoteInfo(address, electId) {
    var searchType = "voterinfo"
    return this._http.get("https://www.googleapis.com/civicinfo/v2/" + searchType + "?key=" + this.key + "&address=" + address + "&electionId=" + electId);
  }

  testFunction(address) {
      var searchType = "voterinfo"
      return this._http.get("https://www.googleapis.com/civicinfo/v2/" + searchType + "?key=" + this.key + "&address=" + address);
  }


}
