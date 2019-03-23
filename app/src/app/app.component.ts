import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public user: any = {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    private menu: MenuController,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.getState().subscribe(state => {
        if (state) {
          this.router.navigate(['private', 'dashboard']);
          console.log('Yes state');
        } else {
          this.router.navigate(['lander']);
          console.log('No state');
        }
      });

      this.userService.getUser(window.localStorage.getItem('userId'))
        .subscribe(res => {
          this.user = res;
        });
    });
  }

  public logout() {
    this.menu.enable(false);
    this.authService.logout();
  }

  public isLoggedIn() {
    return this.authService.isAuthenticated();
  }
}
