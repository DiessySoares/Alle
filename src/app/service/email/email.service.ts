import { Injectable } from '@angular/core';
import { EmailData } from './../../models/email-data';
import { AesService } from '../aes/aes.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private authService: AuthService, private aesService: AesService) { }

  private locked = true;


 /**
 * Descriptografa os elementos do usuario
 */
  async unlock(){
    if(this.locked) {
      for (let i = 0; i < this.authService.currentUser().emailData.length; i++) {

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().emailData[i].password, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().emailData[i].password = password;
        })

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().emailData[i].email, this.authService.getPasswordSession()).then(email => {
          this.authService.currentUser().emailData[i].email = email;
        })

      }
      return this.locked = false;
    }
  }

  /**
  * Criptografa os elementos do usuario, chamar antes de atualiazar o usuario
  */
  async lock()  {
    if(!this.locked) {
      for (let i = 0; i < this.authService.currentUser().emailData.length; i++) {

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().emailData[i].password, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().emailData[i].password = password;
        })

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().emailData[i].email, this.authService.getPasswordSession()).then(email => {
          this.authService.currentUser().emailData[i].email = email;
        })

      }
      return this.locked = true;
    }
  }

  add(credit: EmailData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      credit.id = this.authService.currentUser().emailData.length + 1;
      this.authService.currentUser().emailData.push(credit);
    }
  }

  getAll() {
    if (this.authService.isAuthenticated()) {
      return this.authService.currentUser().emailData;
    }
    return null;
  }

  get(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().emailData.find(x => x.id == id);
    }
    return null;
  }

  update(newEmail: EmailData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      for (let i = 0; i < this.authService.currentUser().emailData.length; i++) {
        if (this.authService.currentUser().emailData[i].id == newEmail.id) {
          this.authService.currentUser().emailData[i] = newEmail;
        }
      }
    }
  }

  delete(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      this.authService.currentUser().emailData.forEach((element, index) => {
        if (element.id == id)  {
          this.authService.currentUser().emailData.splice(index, 1);
        }
      });
    }
  }
}