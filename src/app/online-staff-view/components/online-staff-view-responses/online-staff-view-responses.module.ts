import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffViewResponsesComponent} from './online-staff-view-responses.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ShiftDetailsActionsModule} from './components/shift-details-actions/shift-details-actions.module';
import {OnlineStaffViewNotificationModule} from './components/online-staff-view-notification/online-staff-view-notification.module';

@NgModule({
  declarations: [OnlineStaffViewResponsesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShiftDetailsActionsModule,
    OnlineStaffViewNotificationModule
  ],
  exports: [
    OnlineStaffViewResponsesComponent
  ]
})
export class OnlineStaffViewResponsesModule {
}
