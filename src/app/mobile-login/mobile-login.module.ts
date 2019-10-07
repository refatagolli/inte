import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {MobileLoginRoutingModule} from './mobile-login-routing.module';
import {MobileLoginComponent} from './mobile-login.component';

@NgModule({
  declarations: [
    MobileLoginComponent
  ],
  exports: [
    MobileLoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MobileLoginRoutingModule
  ]
})
export class MobileLoginModule { }
