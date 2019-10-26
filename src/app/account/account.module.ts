import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { MatModule } from '../mat/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
