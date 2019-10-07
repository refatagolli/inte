import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffViewMyScheduleComponent} from './online-staff-view-my-schedule.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [OnlineStaffViewMyScheduleComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    OnlineStaffViewMyScheduleComponent
  ]
})
export class OnlineStaffViewMySheduleModule {
}
