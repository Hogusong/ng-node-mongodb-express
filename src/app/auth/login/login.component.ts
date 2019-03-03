import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubscription = new Subscription();
  message = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginSubscription = this.authService.getLoginSubject().subscribe(result => {
      if (result) {
        this.message = result;  
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  onLogin(form:  NgForm) {
    if (form.invalid) {  return  }
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}