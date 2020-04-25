import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './../shared/notification.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'https://radiant-refuge-42270.herokuapp.com/api';
  // dev
  // endpoint: string = 'http://localhost:5000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
      private http: HttpClient,
      public router: Router,
      private notifyService: NotificationService,
  ) {}

  // Sign-up
  async signUp(user: User): Promise<any> {
    let api = `${this.endpoint}/register-user`;
    /*return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
    )*/
      try {
          const res = await this.http.post(api, user).toPromise();
          this.notifyService.showSuccess("User successfully created.", "Success");
          return res;
      } catch (err) {
          //console.log(err);
          //this.notifyService.showError(err, "Error");
          this.handleError(err);
      }
  }

  // Sign-in
    async signIn(user: User): Promise<any> {
        //return this.http.post<any>(`${this.endpoint}/signin`, user)
        let api = `${this.endpoint}/signin`;
        try {
            const res: any = await this.http.post(api, user).toPromise();
            if (res.token) {
                this.notifyService.showSuccess("Success", "You're now logged.");
                localStorage.setItem('access_token', res.token);
                localStorage.setItem('currentUserId', res.msg._id);
                localStorage.setItem('currentUserName', res.msg.name);
                localStorage.setItem('currentUserRights', res.msg.rights);

                this.router.navigate(['home']);
            }

        } catch(error) {
            this.handleError(error);
        }
    }

  getToken() {
      return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
        this.notifyService.showSuccess("You're not logged anymore.", "Success");
        this.router.navigate(['log-in']);
    }
  }

  getCurrentUserId() {
      return localStorage.getItem('currentUserId');
  }

  // Rights
  getCanListRobot(){
      return localStorage.getItem('currentUserRights').search("list") === -1 ? false : true;
  }

  getCanCreateRobot(){
      return localStorage.getItem('currentUserRights').search("create") === -1 ? false : true;
  }

  getCanSellRobot(){
      return localStorage.getItem('currentUserRights').search("sell") === -1 ? false : true;
  }

  /*getCanEditUsers(){
      return localStorage.getItem('currentUserRights').search("editUsers") === -1 ? false : true;
  }*/

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      //console.log(error);
      if (error.status === 401) {
          this.notifyService.showError("Wrong email or password.", "Error in athentication");
      }

      if (error.status === 500) {
          this.notifyService.showError("Email already used.", "Error in subscribing");
      }

      if (error.status === 422) {
          this.notifyService.showError("Name too short, or invalid password.", "Error in subscribing");
      }

      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
