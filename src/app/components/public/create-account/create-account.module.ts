import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAccountComponent } from './create-account.component'
import { SharedModule } from '../../shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ]
})
export class CreateAccountModule { }
