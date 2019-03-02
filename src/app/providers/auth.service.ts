import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AUTH } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authSubject = new Subject<boolean>();
  tokenTimer: any;

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token;
  }

  getAuthSubject() {
    return this.authSubject.asObservable();
  }

  addUser(email, password) {
    const newUser: AUTH = { email: email, password: password }; 
    this.http.post('http://localhost:3000/api/signup', newUser)
      .subscribe(res => {
        console.log('result:', res);
      })
  }

  login(email, password) {
    const newUser: AUTH = { email: email, password: password }; 
    this.http.post<{token:string, expiresIn: number}>('http://localhost:3000/api/login', newUser)
      .subscribe(res => {
        this.token = res.token;
        const expiresIn = res.expiresIn * 1000;
        if (this.token) {
          this.authSubject.next(true);
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresIn);
        }
      });
  }

  logout() {
    this.authSubject.next(false);
    this.token = null;
    clearTimeout(this.tokenTimer);
  }
}