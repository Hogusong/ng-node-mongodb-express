import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupForm') signupForm: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.signupForm.setValue({
        email: 'narvar@gmail.com', password: '1234'
      })  
    }, 300)
  }

  onSignup() {
    if (this.signupForm.invalid) {  return  }
    console.log(this.signupForm.value)
    this.router.navigate(['/']);
  }
}