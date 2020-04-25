import { Injectable } from '@angular/core';
import { Robot } from './robot';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { NotificationService } from './../shared/notification.service'

@Injectable({
  providedIn: 'root'
})

export class RobotService {
    endpoint: string = 'https://radiant-refuge-42270.herokuapp.com/api';
    // dev
    //endpoint: string = 'http://localhost:5000/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
      private http: HttpClient,
      private notifyService : NotificationService,
      public router: Router,
      public authService: AuthService,
  ) {}

  // List robot
  async getRobotList(): Promise<any> {

      let api = `${this.endpoint}/robots`;
      try {
          return await this.http.get(api).toPromise();
      } catch (err) {
          this.handleError(err);
      }
  }

  // create robot
  async createRobot(name: String, type: String, price: Number): Promise<any> {

      if (!this.authService.getCanCreateRobot()) {
          this.notifyService.showError("You're not allowed to create a robot.", "Error");
          return;
      }

      const robot: Robot = new Robot(name, type, price);
      let api = `${this.endpoint}/robot`;
      try {
          return await this.http.post(api, robot).toPromise();
      } catch (err) {
          this.handleError(err);
      }
  }

  // delete robot
  async deleteRobot(id: String): Promise<any> {

    if (!this.authService.getCanSellRobot()) {
        this.notifyService.showError("You're not allowed to sell a robot.", "Error");
        return;
    }

    let api = `${this.endpoint}/robot/${id}`;
    try {
        return await this.http.delete(api).toPromise();
    } catch (err) {
        this.handleError(err);
    }
}

// delete robot
async getRobot(id: String): Promise<any> {

  let api = `${this.endpoint}/robot/${id}`;
  try {
      return await this.http.get(api).toPromise();
  } catch (err) {
      this.handleError(err);
  }
}

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
