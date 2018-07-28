import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenManagerService } from './token-manager.service';
import { UserApiService } from "./user-api.service";

@Injectable()
export class OrgApiService {

constructor(private http: HttpClient, private tokenManagerService: TokenManagerService, private userApiService: UserApiService) { }





}
