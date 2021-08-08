import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './service/auth/auth.service'

import { LoginComponent } from './components/public/login/login.component';
import { CreateAccountComponent } from './components/public/create-account/create-account.component';

import { HomeComponent } from './components/private/home/home.component'; 
import { ItemPageComponent } from './components/private/item-page/item-page.component'; 

const routes: Routes = [
  
 // PUBLIC ------------------
 { path: '', redirectTo: '/login', pathMatch: 'full' },
 { path: 'login', component: LoginComponent, data: {depth: 1} },
 { path: 'create-account', component: CreateAccountComponent, data: {depth: 2} },

 // PRIVATE ------------------
 { path: 'home', component: HomeComponent, canActivate: [AuthService], data: {depth: 3} },
 { path: 'item-page/:id', component: ItemPageComponent, canActivate: [AuthService], data: {depth: 4} },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
