import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { env } from 'src/app/shared/env-consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private auService: AuthService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("tokenUser")){
      this.router.navigate(['/'])
    }
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      pass: new FormControl(null),
      remember: new FormControl(null),
    });
  }

  login() {
    console.log(this.loginForm.get('remember').value);
    this.auService.login(this.loginForm.get('email').value, this.loginForm.get('pass').value).subscribe((result) => {
      this.auService.username = result['result'].foundUser.fullName;
      this.auService.avatarUrl = env.assestUrl + result['result'].foundUser.avatar;
      localStorage.setItem("tokenUser",result['result'].token)
      this.auService.token = result['result'].token;

      this.router.navigate(['/']);
    }, (error) => {
      console.log(error);

    });
  }

}
