import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../service/auth/auth.service'
import { FingerCredential } from './../../../models/finger-credential';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { StorageService } from './../../../service/storage/storage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public useFingerCredential = false;

  private readonly FINGER_STATE = "5Jh%gmU#bvIw2x$$"
  private readonly SAVED_CREDENTIAL = "LVKkdK8!918nw#lA"

  public showPassword: boolean;

  public username = "";
  public password = "";

  public loginForm: FormGroup;

  constructor(private formBuider: FormBuilder,
    private authService: AuthService,
    private storage: StorageService,
    private faio: FingerprintAIO) {
  }

  async ngOnInit() {
    this.username = "";
    this.password = "";

    this.initForms();

    await this.storage.init();

    this.getUseFingerCredential().then(value => {
      this.useFingerCredential = JSON.parse(value);
    })
  }

  ionViewWillEnter() {
    this.username = "";
    this.password = "";
  }

  public login() {
    if (this.useFingerCredential) {
      this.faio.isAvailable().then(result => {
        if (result === "biometric" || result === "face") {
          this.getCredentialSaved().then(cred => {
            if (cred == null) {
              this.faio.registerBiometricSecret({ secret: this.password }).then((result: any) => {
                if (result == "biometric_success") {
                  //Fingerprint/Face was successfully verified    
                  let credential = new FingerCredential();
                  credential.user = this.username;
                  this.setCredentialSaved(credential);
                  this.authService.login(this.username, this.password);
                }
              })
            } else {
              this.faio.loadBiometricSecret({}).then((secret: any) => {
                //Fingerprint/Face was successfully verified    
                this.authService.login(cred.user, secret);
              })
            }
          })
        } else {
          alert("A autenticação por impressão digital / rosto não está disponível neste dispositivo!")
        }
      })
    } else {
      this.authService.login(this.username, this.password);
    }
  }

  setUseFingerCredential() {
    this.removeCredentialSaved();
    this.storage.set(this.FINGER_STATE, String(!this.useFingerCredential))
    if (!this.useFingerCredential) {
      alert("Para usar a digital primeiramente faça o login!");
    }
  }

  async getUseFingerCredential() {
    return this.storage.get(this.FINGER_STATE);
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
      usrFinger: [''],
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  getCredentialSaved() {
    return this.storage.get(this.SAVED_CREDENTIAL);
  }

  setCredentialSaved(credential: any) {
    return this.storage.set(this.SAVED_CREDENTIAL, credential);
  }

  removeCredentialSaved() {
    return this.storage.remove(this.SAVED_CREDENTIAL);
  }
}
