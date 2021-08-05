import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule
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

    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    NbListModule,

    PasswordStrengthMeterModule,

    NbEvaIconsModule,
    NbIconModule,
  ]
})
export class SharedModule { }
