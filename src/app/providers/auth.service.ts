import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AUTH } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  addUser(email, password) {
    const newUser: AUTH = { email: email, password: password }; 
    this.http.post('http://localhost:3000/api/signup', newUser)
      .subscribe(res => {
        console.log('result:', res);
      })
  }
}