import { Injectable } from '@angular/core';
import { WifiData } from 'src/app/models/wifi-data';
import { AesService } from '../aes/aes.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WifiService {

  constructor(private authService: AuthService, private aesService: AesService) { }

  private locked = true;


 /**
 * Descriptografa os elementos do usuario
 */
  async unlock(){
    if(this.locked) {
      for (let i = 0; i < this.authService.currentUser().wifiData.length; i++) {

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().wifiData[i].password, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().wifiData[i].password = password;
        })

        await this.aesService.aesGcmDecrypt(this.authService.currentUser().wifiData[i].user, this.authService.getPasswordSession()).then(user => {
          this.authService.currentUser().wifiData[i].user = user;
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
      for (let i = 0; i < this.authService.currentUser().wifiData.length; i++) {

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().wifiData[i].password, this.authService.getPasswordSession()).then(password => {
          this.authService.currentUser().wifiData[i].password = password;
        })

        await this.aesService.aesGcmEncrypt(this.authService.currentUser().wifiData[i].user, this.authService.getPasswordSession()).then(user => {
          this.authService.currentUser().wifiData[i].user = user;
        })

      }
      return this.locked = true;
    }
  }

  resolveOpFields(wifi: WifiData){
    if(wifi.authenticationMethod == undefined) {
      wifi.authenticationMethod = null;
    }
    if(wifi.connectionType == undefined) {
      wifi.connectionType = null;
    }
    if(wifi.user == undefined) {
      wifi.user = null;
    }
    return wifi;
  }


  add(wifi: WifiData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      wifi.id = this.authService.currentUser().wifiData.length + 1;
      this.authService.currentUser().wifiData.push(wifi);
    }
  }

  getAll() {
    if (this.authService.isAuthenticated()) {
      return this.authService.currentUser().wifiData;
    }
    return null;
  }

  get(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      return this.authService.currentUser().wifiData.find(x => x.id == id);
    }
    return null;
  }

  update(newWifi: WifiData) {
    if (this.authService.isAuthenticated() && !this.locked) {
      for (let i = 0; i < this.authService.currentUser().wifiData.length; i++) {
        if (this.authService.currentUser().wifiData[i].id == newWifi.id) {
          this.authService.currentUser().wifiData[i] = newWifi;
        }
      }
    }
  }

  delete(id: number) {
    if (this.authService.isAuthenticated() && !this.locked) {
      this.authService.currentUser().wifiData.forEach((element, index) => {
        if (element.id == id)  {
          this.authService.currentUser().wifiData.splice(index, 1);
        }
      });
    }
  }
}
