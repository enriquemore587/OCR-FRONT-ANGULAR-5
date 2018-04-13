import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url: string;
  public token: string;
  public auth: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this.url+'session/register', params, {headers: headers})
    .map(res => res.json());

  }

  login(user_to_login){
    let params = JSON.stringify(user_to_login);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url+'session/login', params, {headers: headers})
    .map(res => res.json());
  }

  getAuth() {
    let auth = localStorage.getItem('auth');
    
    if (auth != "undefined") {
      this.auth = auth;
    }else{
      this.auth = null;
    }
    return this.auth;
  }
}
