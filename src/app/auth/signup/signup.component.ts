import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupForm') signupForm: NgForm;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.signupForm.setValue({
        email: '', password: ''
      })  
    }, 300)
  }

  onSignup(form: NgForm) {
    if (form.invalid) {  return  }
    this.authService.addUser(form.value.email, form.value.password);
    this.router.navigate(['/']);
  }
}