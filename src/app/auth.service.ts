import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {API_ROOT, API_LOGIN, API_GOOGLE_LOGIN } from './resource';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token;
  constructor(private http: HttpClient, private router: Router) {}

  login(login: string, password: string) {
    this.http
      .post(API_ROOT + API_LOGIN, { username: login, password: password })
      .subscribe((resp: any) => {
        this.router.navigate(['profile']);
        localStorage.setItem('token', resp.access_token);
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  googleLogin(googleToken:string){
    this.http
      .post(API_ROOT + API_GOOGLE_LOGIN, { googleToken: googleToken})
      .subscribe((resp: any) => {
        this.router.navigate(['profile']);
        localStorage.setItem('token', resp.access_token);
      });
  }

  public get logIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
