import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileForgotPasswordComponent } from './mobile-forgot-password.component';
import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {MobileForgotPasswordRoutingModule} from './mobile-forgot-password-routing.module';

@NgModule({
  declarations: [
    MobileForgotPasswordComponent
  ],
  exports: [
    MobileForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MobileForgotPasswordRoutingModule
  ]
})
export class MobileForgotPasswordModule { }
