import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineStaffViewNotificationComponent } from './online-staff-view-notification.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';

@NgModule({
  declarations: [OnlineStaffViewNotificationComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    OnlineStaffViewNotificationComponent
  ]
})
export class OnlineStaffViewNotificationModule { }
