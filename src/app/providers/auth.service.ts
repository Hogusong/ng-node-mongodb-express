import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AUTH } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token;
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
    this.http.post<string>('http://localhost:3000/api/login', newUser)
      .subscribe(res => this.token = res);
  }
}