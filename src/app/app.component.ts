import { Component } from '@angular/core';
import { trigger, animate, style, transition, keyframes} from '@angular/animations';
import { UserService } from './service/user/user.service'

import { AesService } from './service/aes/aes.service'
import { NbToastrService } from '@nebular/theme';

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

  constructor(private userService: UserService, private aesService: AesService, private toastrService: NbToastrService) {}

  ngOnInit() {
    if(window.navigator.onLine) {
      this.userService.ngOnInit();
    } else {
      this.showErrorToast();
    }
    
  }

  getDepth(outlet) {
      return outlet.activatedRouteData['depth'];
  }

  showErrorToast() {
    this.toastrService.show('A aplicação esta com problemas de internet!',
      'Erro!',
      {
        status: 'danger',
        position: <any> 'top-right',
        duration: <any> '3000'
      });
  }
  

}