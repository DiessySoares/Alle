import { Injectable } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { CreditService } from '../credit/credit.service';
import { EmailService } from '../email/email.service';
import { TextService } from '../text/text.service';
import { WebpageService } from '../webpage/webpage.service';
import { WifiService } from '../wifi/wifi.service';
import { AuthService } from './../auth/auth.service'



@Injectable({
  providedIn: 'root'
})
export class ItemListService {

  public list: any[] = [];

  constructor(
    private authService: AuthService, 
    private applicationService: ApplicationService, 
    private creditService: CreditService,
    private wifiService: WifiService,
    private webService: WebpageService,
    private emailService: EmailService,
    private textService : TextService,
    ) { }

  public update(type: number) {
    this.list = [];

    switch (type) {
      case 1:
        this.wifiService.unlock().then( () => {
          this.list = this.authService.currentUser().wifiData;
        });
        break;
      case 2:
        this.webService.unlock().then( () => {
          this.list = this.authService.currentUser().webData;
        });
        break;
      case 3:
        this.creditService.unlock().then( () => {
          this.list = this.authService.currentUser().creditCard;
        });
        break;
      case 4:
        this.emailService.unlock().then( () => {
          this.list = this.authService.currentUser().emailData;
        });
        break;
      case 5:
        this.applicationService.unlock().then( () => {
          this.list = this.authService.currentUser().aplication;
        });
        break;
      case 6:
        this.textService.unlock().then( () => {
          this.list = this.authService.currentUser().textData;
        });
        break;
    }

  }

}
