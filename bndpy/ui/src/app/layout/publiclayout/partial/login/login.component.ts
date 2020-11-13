import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../shared/services/api/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private UserService:UserService
  ) { }
  show=false;
  mode='login'
  ngOnInit(): void {
    this.mode=='login'?this.initLogin():this.initRegister();
    this.authCheck();
    this.UserService.showStatus.subscribe(res=>{
      this.show=res;
    })
  }
  
  close(){
    this.UserService.showStatus.next(false);
  }
  open(){
    this.UserService.showStatus.next(true);
  }
  loggedSuccessfuly(){
    this.UserService.loggedStatus.next(true);
  }
  login(){
    this.UserService.CheckByUserPass(this.loginForm.value).subscribe(res=>{
      console.log(res)
      if(res.success==true){
        this.loggedSuccessfuly();
        this.close();
        localStorage.setItem('UiUser',res.result.tokens[0].token)
      }
    })
  }
  authCheck(){
    
    if(localStorage.getItem('UiUser')){
      // this.loggedSuccessfuly();
      this.UserService.CheckByToken(localStorage.getItem('UiUser')).subscribe(res=>{
        console.log(res)
        if(res.success==true){
          this.loggedSuccessfuly();
        }else{
          this.GotoRegister();
        }
        
      })

    }else{
      return
    }
  }
  register(){
    this.UserService.AddUiUser(this.registerForm.value).subscribe(res=>{
      console.log(res);
      if(res.success==true){
        this.close();
        this.loggedSuccessfuly();
        localStorage.setItem('UiUser',res.Uzer.tokens[0].token)
      }
    })
  }
  GotoLogin(){
    this.mode='login'
    this.initLogin()
  }
  GotoRegister(){
    this.mode='register'
    this.initRegister()
  }
  loginForm :FormGroup
  registerForm:FormGroup
  initLogin(){
    this.loginForm= new FormGroup({
      'user':new FormControl(''),
      'pass':new FormControl('')
    })

  }

  initRegister(){
    this.registerForm= new FormGroup({
      'user':new FormControl(''),
      'pass':new FormControl('')
    })

  }

}
