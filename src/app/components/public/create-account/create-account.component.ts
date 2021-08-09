import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user/user.service';



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {

  public showPassword: boolean;
  public newUser: User = {} as User;

  public usrForm: FormGroup;
  
  constructor(private formBuider: FormBuilder, 
              private toastrService: NbToastrService, 
              private router: Router,
              private userService: UserService
              ) { }


  showSuccessToast() {
    this.toastrService.show('Sua conta foi criada!',
      'Sucesso!',
      {
        status: 'success',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  showErrorToast() {
    this.toastrService.show('Esse nome já foi usado!',
      'Erro!',
      {
        status: 'danger',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }

  ngOnInit() {
    this.initForms();
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  private initForms() {
    this.usrForm = this.formBuider.group({
      usrName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      usrEmail: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      usrPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
    });
  }

  getInputStatus(formItem: string) {
    return this.usrForm.controls[formItem].dirty && this.usrForm.controls[formItem].invalid ? 'danger' : 'basic';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  createAccount(){
    if(!this.userService.exist(this.newUser.name)) {
      this.userService.createUser(this.newUser);
      this.showSuccessToast();
      this.router.navigate(['login']);
    } else {
      this.showErrorToast();
    }
  }

  getBack(){
    this.newUser = {} as User;
    this.router.navigate(['login']);
  }



}
