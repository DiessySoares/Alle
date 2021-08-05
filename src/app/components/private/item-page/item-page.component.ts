import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemListService } from 'src/app/service/item-list/item-list.service';

import { ApplicationService } from 'src/app/service/application/application.service';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from './../../../service/auth/auth.service'

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit {

  /*-------------------------
  TYPES
  1 - wifi
  2 - banking
  3 - application
  4 - web
  5 - email
  6 - text
  -------------------------*/
  public type: number;

  public selected;

  password

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public listService: ItemListService,

    private authService: AuthService ,
    private applicationService: ApplicationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.type = Number(this.route.snapshot.paramMap.get('id'));
    this.listService.update(this.type);
  }

  select(selected: any) {
    this.selected = selected;
  }

  public isWifi() { return this.type == 1; }
  public isWeb() { return this.type == 2; }
  public isCredit() { return this.type == 3; }
  public isEmail() { return this.type == 4; }
  public isApp() { return this.type == 5; }
  public isText() { return this.type == 6; }

}
