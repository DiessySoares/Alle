import { Injectable } from '@angular/core';
import { TextData } from 'src/app/models/text-data';
import { AesService } from '../aes/aes.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private authService: AuthService, private aesService: AesService) { }

  private locked = true;


 /**
 * Descriptografa os elementos do usuario
 */
  async unlock(){
    if(this.locked) {
      for (let i = 0; i < this.authService.currentUser().textData.length; i++) {

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().textData[i].text, this.authService.getPasswordSession()).then(text => {
          this.authService.currentUser().textData[i].text = text;
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
      for (let i = 0; i < this.authService.currentUser().textData.length; i++) {

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().textData[i].text, this.authService.getPasswordSession()).then(text => {
          this.authService.currentUser().textData[i].text = text;
        })

      }
      return this.locked = true;
    }
  }

  add(credit: TextData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      credit.id = this.authService.currentUser().textData.length + 1;
      this.authService.currentUser().textData.push(credit);
    }
  }

  getAll() {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().textData;
    }
    return null;
  }

  get(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().textData.find(x => x.id == id);
    }
    return null;
  }

  update(newText: TextData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      for (let i = 0; i < this.authService.currentUser().textData.length; i++) {
        if (this.authService.currentUser().textData[i].id == newText.id) {
          this.authService.currentUser().textData[i] = newText;
        }
      }
    }
  }

  delete(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      this.authService.currentUser().textData.forEach((element, index) => {
        if (element.id == id)  {
          this.authService.currentUser().textData.splice(index, 1);
        }
      });
    }
  }
}