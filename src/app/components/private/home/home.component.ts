import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/type';


import { ApplicationService } from './../../../service/application/application.service'
import { CreditService } from './../../../service/credit/credit.service'
import { EmailService } from './../../../service/email/email.service'
import { TextService } from './../../../service/text/text.service'
import { WebpageService } from './../../../service/webpage/webpage.service'
import { WifiService } from './../../../service/wifi/wifi.service'

import { UserService } from './../../../service/user/user.service'
import { AuthService } from './../../../service/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  querry = "";
  searchArray: any[] = [];

  public selected;

  types: Type[] = [];

  constructor(
    private applicationService: ApplicationService,
    private creditService: CreditService,
    private emailService: EmailService,
    private textService: TextService,
    private webpageService: WebpageService,
    private wifiService: WifiService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  indexHtml = 0

  ngOnInit() {
    this.fakeData();
  }

   ionViewWillEnter(){
    this.getUsage();
   }

  private fakeData() {
    this.types = [
      { idType: 1, typ_name: 'Wifi', typ_icon: 'wifi-outline', size: 0},
      { idType: 2, typ_name: 'Web page', typ_icon: 'browser-outline', size: 0 },
      { idType: 3, typ_name: 'Banking', typ_icon: 'credit-card-outline', size: 0 },
      { idType: 4, typ_name: 'Email', typ_icon: 'email-outline', size: 0 },
      { idType: 5, typ_name: 'Aplicação', typ_icon: 'layout-outline', size: 0 },
      { idType: 6, typ_name: 'Texto', typ_icon: 'file-text-outline', size: 0 },
    ]
  }

  private getUsage(){

    this.types[0].size = this.wifiService.getAll().length;
    this.types[1].size = this.webpageService.getAll().length;
    this.types[2].size = this.creditService.getAll().length;
    this.types[3].size = this.emailService.getAll().length;
    this.types[4].size = this.applicationService.getAll().length;
    this.types[5].size = this.textService.getAll().length;
  }


  select(selected: any) {
    this.selected = selected;
  }

  search() { }


  sair() {
    /*
      Com isso agora é ilegal eu usar Angular em 80 paises, obrigado!
    */
    this.applicationService.lock().then(() => {
      this.creditService.lock().then(() => {
        this.emailService.lock().then(() => {
          this.textService.lock().then(() => {
            this.webpageService.lock().then(() => {
              this.wifiService.lock().then(() => {
                this.userService.updateUser(this.authService.currentUser()).then(done => {
                  this.authService.logout();
                })
              })
            })
          })
        })
      })
    })
  }

}
