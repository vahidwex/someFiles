import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserModel } from '../shared/models/user.model';
import { env } from 'src/app/shared/env-consts';
@Injectable()
export class AuthService {

  token = '';
  username = '';
  avatarUrl = '';

  constructor(private httpClient: HttpClient, private router: Router ) {}


  login(email: string, password: string) {
    console.log(email, password);
    const req = this.httpClient.post<any>('admin/', {email, pass: password} , {
      observe: 'body',
      responseType: 'json'
    }) ;


    return req;
  }

  logout() {

    this.token = '';
  }

  getToken() {


  }

  isAuthenticated() {
    this.token=localStorage.getItem("tokenUser");
    const authCon = this.token !== '';

    return authCon;
  }
}
