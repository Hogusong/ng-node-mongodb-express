import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.loginForm.setValue({
        email: 'narvar@gmail.com', password: '1234'
      })  
    }, 300)
  }

  onLogin() {
    if (this.loginForm.invalid) {  return  }
    console.log(this.loginForm.value)
    this.router.navigate(['/']);
  }
}