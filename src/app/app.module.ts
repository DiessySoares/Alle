import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { NbCardModule, NbDialogModule, NbIconModule, NbLayoutModule, NbSpinnerModule, NbThemeModule, NbToastrModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginModule } from './components/public/login/login.module'
import { CreateAccountModule } from './components/public/create-account/create-account.module'

import { HomeModule } from './components/private/home/home.module'
import { ItemPageModule } from './components/private/item-page/item-page.module'
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';


import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { HttpClientModule } from '@angular/common/http';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    
    PasswordStrengthMeterModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    NbThemeModule.forRoot({ name: 'dark' }),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbToastrModule.forRoot(),

    NbSpinnerModule,
    NbCardModule,

    NgxSkeletonLoaderModule.forRoot(),


    LoginModule,
    CreateAccountModule,

    HomeModule,
    ItemPageModule,

    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
