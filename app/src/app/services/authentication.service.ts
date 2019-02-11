import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const TOKEN_KEY = 'accessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.serverURL;
  private user = null;
  private authenticationState = new BehaviorSubject(false);
  private userSubject = new Subject<any>();

  constructor(private storage: Storage, private plat: Platform,
    private http: HttpClient, private helper: JwtHelperService,
    private alertController: AlertController, private router: Router) {
    this.plat.ready().then(() => {
      this.checkToken();
    });
  }

  public checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        this.storage.set(TOKEN_KEY, token);
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
          this.userSubject.next(this.user);
        } else {
          this.storage.remove(TOKEN_KEY);
          window.localStorage.removeItem(TOKEN_KEY);
        }
      }
    });
  }

  public getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public register(credentials) {
    return this.http.post(`${this.url}/api/auth/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  public login(credentials) {
    return this.http.post(`${this.url}/api/auth/login`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['accessToken']);
          window.localStorage.setItem(TOKEN_KEY, res['accessToken']);
          this.user = this.helper.decodeToken(res['accessToken']);
          this.authenticationState.next(true);
          this.userSubject.next(this.user);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
    );
  }

  public logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      window.localStorage.removeItem(TOKEN_KEY);
      this.authenticationState.next(false);
      this.router.navigate(['/login']);
    });
  }

  public isAuthenticated() {
    return this.authenticationState.value;
  }

  public getState() {
    return this.authenticationState;
  }

  public getUser() {
    return this.userSubject;
  }

  public showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(res => res.present());
  }
}
