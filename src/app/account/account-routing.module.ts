import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginGuard } from '../core/guard/login.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
