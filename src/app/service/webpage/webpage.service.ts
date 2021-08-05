import { Injectable } from '@angular/core';
import { WebData } from 'src/app/models/webpage-data';
import { AesService } from '../aes/aes.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebpageService {

  constructor(private authService: AuthService, private aesService: AesService) { }

  private locked = true;


 /**
 * Descriptografa os elementos do usuario
 */
  async unlock(){
    if(this.locked) {
      for (let i = 0; i < this.authService.currentUser().webData.length; i++) {

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().webData[i].password, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().webData[i].password = password;
        })

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().webData[i].user, this.authService.getPasswordSession()).then(user => {
          this.authService.currentUser().webData[i].user = user;
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
      for (let i = 0; i < this.authService.currentUser().webData.length; i++) {

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().webData[i].password, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().webData[i].password = password;
        })

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().webData[i].user, this.authService.getPasswordSession()).then(user => {
          this.authService.currentUser().webData[i].user = user;
        })

      }
      return this.locked = true;
    }
  }

  add(web: WebData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      web.id = this.authService.currentUser().webData.length + 1;
      this.authService.currentUser().webData.push(web);
    }
  }

  getAll() {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().webData;
    }
    return null;
  }

  get(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().webData.find(x => x.id == id);
    }
    return null;
  }

  update(newWeb: WebData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      for (let i = 0; i < this.authService.currentUser().webData.length; i++) {
        if (this.authService.currentUser().webData[i].id == newWeb.id) {
          this.authService.currentUser().webData[i] = newWeb;
        }
      }
    }
  }

  delete(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      this.authService.currentUser().webData.forEach((element, index) => {
        if (element.id == id)  {
          this.authService.currentUser().webData.splice(index, 1);
        }
      });
    }
  }
}
