import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    private menu: MenuController,
    private storage: Storage
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
        } else {
          this.router.navigate(['lander']);
        }
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

  public clearToken() {
    // Just for testing.
    this.storage.remove('accessToken');
  }
}
