import { Injectable } from '@angular/core';
import { AppData } from './../../models/application-data';
import { AuthService } from './../auth/auth.service'
import { AesService } from './../aes/aes.service'
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private authService: AuthService, private aesService: AesService) { }

  private locked = true;

  /**
  * Descriptografa os elementos do usuario
  */
  async unlock() {
    if (this.locked) {
      for (let i = 0; i < this.authService.currentUser().aplication.length; i++) {

        if (this.authService.currentUser().aplication[i].password) {
          await this.aesService.aesGcmDecrypt(this.authService.currentUser().aplication[i].password, this.authService.getPasswordSession()).then(password => {
            this.authService.currentUser().aplication[i].password = password;
          })
        }
        if (this.authService.currentUser().aplication[i].activationCode) {
          await this.aesService.aesGcmDecrypt(this.authService.currentUser().aplication[i].activationCode, this.authService.getPasswordSession()).then(activationCode => {
            this.authService.currentUser().aplication[i].activationCode = activationCode;
          })
        }

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().aplication[i].user, this.authService.getPasswordSession()).then(user => {
          this.authService.currentUser().aplication[i].user = user;
        })

      }
      return this.locked = false;
    }
  }

  /**
  * Criptografa os elementos do usuario, chamar antes de atualiazar o usuario
  */
  async lock() {
    if (!this.locked) {
      for (let i = 0; i < this.authService.currentUser().aplication.length; i++) {

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().aplication[i].password, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().aplication[i].password = password;
        })

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().aplication[i].activationCode, this.authService.getPasswordSession()).then(activationCode => {
          this.authService.currentUser().aplication[i].activationCode = activationCode;
        })

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().aplication[i].user, this.authService.getPasswordSession()).then(user => {
          this.authService.currentUser().aplication[i].user = user;
        })

      }
      return this.locked = true;
    }
  }

  add(app: AppData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      app.id = this.authService.currentUser().aplication.length + 1;
      this.authService.currentUser().aplication.push(app);
    } 
  }

  getAll() {
    if (this.authService.isAuthenticated()) {
      return this.authService.currentUser().aplication;
    }
    return null;
  }

  get(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().aplication.find(x => x.id == id);
    }
    return null;
  }

  update(newApp: AppData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      for (let i = 0; i < this.authService.currentUser().aplication.length; i++) {
        if (this.authService.currentUser().aplication[i].id == newApp.id) {
          this.authService.currentUser().aplication[i] = newApp;
        }
      }
    }
  }

  delete(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      this.authService.currentUser().aplication.forEach((element, index) => {
        if (element.id == id) {
          this.authService.currentUser().aplication.splice(index, 1);
        }
      });
    }
  }

}
