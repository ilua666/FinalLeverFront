import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
declare const gapi: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        window['onSignIn'] = function (user) {
          this.onSignIn(user);
        }
      }
    });
  };

  password: string;
  login: string;
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    gapi.signin2.render('g-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': param => this.onSignIn(param)
    });
}

  onLoginClick() {
    this.authService.login(this.login, this.password)
  }

  onSignOutClick() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
  }

  onSignIn(googleUser) {
    console.log('gere');
    var profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    this.authService.googleLogin(id_token)
    console.log(googleUser);
  }
}
