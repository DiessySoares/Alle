import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../service/auth/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public showPassword: boolean;

  public username = "";
  public password = "";

  public loginForm: FormGroup;

  database = false;

  constructor(private formBuider: FormBuilder, private authService: AuthService) { }

  ngOnInit() { 
    this.initForms();
  }

  public login(){
    this.authService.login(this.username, this.password);
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  private initForms() {
    this.loginForm = this.formBuider.group({
      usrName: ['', Validators.required],
      usrPassword: ['', Validators.required],
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
