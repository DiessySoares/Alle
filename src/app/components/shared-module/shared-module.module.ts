import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbToggleModule
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    IonicModule,
    RouterModule,
    NbToggleModule,

    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    NbToggleModule,
    NbListModule,
    NbSelectModule,
    NbAutocompleteModule,

    PasswordStrengthMeterModule,

    NbEvaIconsModule,
    NbIconModule,
  ]
})
export class SharedModule { }
