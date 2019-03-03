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
  private loginSubject = new Subject<any>();
  authStatus = false;
  tokenTimer: any;

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatus;
  }

  getAuthSubject() {
    return this.authSubject.asObservable();
  }

  getLoginSubject() {
    return this.loginSubject.asObservable();
  }

  signup(email, password) {
    const newUser: AUTH = { email: email, password: password }; 
    return this.http.post('http://localhost:3000/api/signup', newUser)
  }

  login(email, password) {
    const newUser: AUTH = { email: email, password: password };
    this.http.post<{token:string, expiresIn: number, userId: string}>('http://localhost:3000/api/login', newUser)
      .subscribe(res => {
        this.token = res.token;
        const expiresIn = res.expiresIn * 1000;
        if (this.token) {
          this.authSubject.next(this.authStatus = true);
          this.loginSubject.next('')
          const expiration = (new Date()).getTime() + expiresIn;
          this.saveAuthData(this.token, new Date(expiration), res.userId);
          this.setAuthTimer(expiresIn);
        }
      }, error => {
        this.loginSubject.next(error.error.message)
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const expiresIn = authInformation.expirationDate.getTime() - (new Date()).getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.authSubject.next(this.authStatus = true);
      this.setAuthTimer(expiresIn);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId)
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (token && expiration) {
      return { token: token,  expirationDate: new Date(expiration) }
    }
    return { token: '', expirationDate: new Date() } ;
  }

  logout() {
    this.authSubject.next(this.authStatus = false);
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }
}