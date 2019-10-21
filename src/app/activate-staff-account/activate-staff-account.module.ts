import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MobileLoginComponent} from '../mobile-login/mobile-login.component';
import {ActivateStaffAccountComponent} from './activate-staff-account.component';
import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {MobileLoginRoutingModule} from '../mobile-login/mobile-login-routing.module';
import {ActivateStaffAccountRoutingModule} from './activate-staff-account-routing.module';

@NgModule({
  declarations: [
    ActivateStaffAccountComponent
  ],
  exports: [
    ActivateStaffAccountComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ActivateStaffAccountRoutingModule
  ]
})
export class ActivateStaffAccountModule { }
