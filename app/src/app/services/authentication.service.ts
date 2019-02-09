import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';


const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plat: Platform) {
    this.plat.ready().then(() => {
      this.checkToken();
    });
  }

  public checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  public async login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }

  public async logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  public isAuthenticated() {
    return this.authenticationState.value;
  }

  public getState() {
    return this.authenticationState;
  }
}
