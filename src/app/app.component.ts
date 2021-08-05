import { Component } from '@angular/core';
import { trigger, animate, style, transition, keyframes} from '@angular/animations';
import { UserService } from './service/user/user.service'

import { AesService } from './service/aes/aes.service'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', animate('200ms ease', keyframes([
        style({opacity: 0,  offset: 0}),
        style({opacity: 1, offset: 1.0}),
    ]))),
    ])
  ]
})
export class AppComponent {

  constructor(private userService: UserService, private aesService: AesService) {}

  ngOnInit() {
    this.userService.ngOnInit();
  }

  getDepth(outlet) {
      return outlet.activatedRouteData['depth'];
  }
}




 /*

    let user: User = {} as User;

    user.name = "Carlos";
    user.passwordPbkdf2 = "1234"
    user.email = "ana@ana";
    user.created_at = new Date();
    user.aplication = [];
    user.creditCard = [];
    user.emailData = [];
    user.textData = [];
    user.webData = [];
    user.wifiData = [];

    this.userServiceService.createUser(user);

    */


    /*this.userServiceService.getAll().snapshotChanges().subscribe(teste => {
      console.log(teste);
    })
*/ 

/*
    
    this.userServiceService.getUserList().subscribe(async data => {
      this.users =  data.map(get => {
        return {
          id:  get.payload.doc.id,
          idUser: get.payload.doc.id,
          name: get.payload.doc.data()['name'],
          email: get.payload.doc.data()['email'],
          passwordPbkdf2: get.payload.doc.data()['passwordPbkdf2'],
          aplication: get.payload.doc.data()['aplication'],
          creditCard: get.payload.doc.data()['creditCard'],
          emailData: get.payload.doc.data()['emailData'],
          textData: get.payload.doc.data()['textData'],
          webData: get.payload.doc.data()['webData'],
          wifiData: get.payload.doc.data()['wifiData'],
          created_at: get.payload.doc.data()['created_at'],
          updated_at: get.payload.doc.data()['updated_at'],
        } as User;
      })

      this.users.forEach(user => {
        if(user.name == "Carlos") {
          user.email = "atualizado"
          user.updated_at = new Date();
          this.userServiceService.updateUser(user, user.idUser);
          return;
        }
      });
    });
    

    */