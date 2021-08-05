import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemPageComponent } from './item-page.component'
import { SharedModule } from '../../shared-module/shared-module.module';


import { RouterModule } from '@angular/router';



// [CHILD-COMPONENT]
import { WifiComponent } from './../data/wifi/wifi.component'
import { WebpageComponent } from './../data/webpage/webpage.component'
import { CreditComponent } from './../data/credit/credit.component'
import { EmailComponent } from './../data/email/email.component'
import { ApplicationComponent } from './../data/application/application.component'
import { TextComponent } from './../data/text/text.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    ItemPageComponent,
    WifiComponent,
    WebpageComponent,
    CreditComponent,
    EmailComponent,
    ApplicationComponent,
    TextComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class ItemPageModule { }
