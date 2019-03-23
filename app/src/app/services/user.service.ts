import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

const userAPI = 'http://192.168.0.10:3000/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Back end returned code ${error.status}, ` +
        `body was: `);
        console.dir(error.error);
    }

    return throwError('Oops! An error occurred.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  public getUser(id): Observable<any> {
    return this.http.get(`${userAPI}/${id}`, this.getHeaders()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // public getUserById(id: string): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get(url, httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError));
  // }

  // public postUser(data): Observable<any> {
  //   const url = `${apiUrl}`;
  //   return this.http.post(url, data, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  public updateUser(id: string, data): Observable<any> {
    return this.http.put(`${userAPI}/${id}`, data, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  // public deleteUser(id: string): Observable<{}> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private getHeaders() {
    const token = this.authService.getToken();
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': token }) };
  }

  public getUserSpots(id): Observable<any> {
    console.log('User ID: ', id);
    return this.http.get(`${userAPI}/spot/${id}`, this.getHeaders()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public addSpot(data): Observable<any> {
    console.log('Data: ', data);
    return this.http.post(`${userAPI}/spot`, data, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }
}
