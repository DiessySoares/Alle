import { Injectable } from '@angular/core';
import { CreditCardData } from 'src/app/models/credit-card-data';
import { AesService } from '../aes/aes.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private authService: AuthService, private aesService: AesService) { }

  private locked = true;


 /**
 * Descriptografa os elementos do usuario
 */
  async unlock(){
    if(this.locked) {
      for (let i = 0; i < this.authService.currentUser().creditCard.length; i++) {

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().creditCard[i].cardPassword, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().creditCard[i].cardPassword = password;
        })

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().creditCard[i].securityNumber, this.authService.getPasswordSession()).then(securityNumber => {
          this.authService.currentUser().creditCard[i].securityNumber = securityNumber;
        })

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().creditCard[i].number, this.authService.getPasswordSession()).then(number => {
          this.authService.currentUser().creditCard[i].number = number;
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
      for (let i = 0; i < this.authService.currentUser().creditCard.length; i++) {

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().creditCard[i].cardPassword, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().creditCard[i].cardPassword = password;
        })

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().creditCard[i].securityNumber, this.authService.getPasswordSession()).then(securityNumber => {
          this.authService.currentUser().creditCard[i].securityNumber = securityNumber;
        })

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().creditCard[i].number, this.authService.getPasswordSession()).then(number => {
          this.authService.currentUser().creditCard[i].number = number;
        })

      }
      return this.locked = true;
    }
  }

  add(credit: CreditCardData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      credit.id = this.authService.currentUser().creditCard.length + 1;
      this.authService.currentUser().creditCard.push(credit);
    }
  }

  getAll() {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().creditCard;
    }
    return null;
  }

  get(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().creditCard.find(x => x.id == id);
    }
    return null;
  }

  update(newCredit: CreditCardData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      for (let i = 0; i < this.authService.currentUser().creditCard.length; i++) {
        if (this.authService.currentUser().creditCard[i].id == newCredit.id) {
          this.authService.currentUser().creditCard[i] = newCredit;
        }
      }
    }
  }

  delete(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      this.authService.currentUser().creditCard.forEach((element, index) => {
        if (element.id == id)  {
          this.authService.currentUser().creditCard.splice(index, 1);
        }
      });
    }
  }

}