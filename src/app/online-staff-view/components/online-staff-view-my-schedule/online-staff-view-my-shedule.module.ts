import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffViewMyScheduleComponent} from './online-staff-view-my-schedule.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ShiftInfoModule} from '../shift-info/shift-info.module';

@NgModule({
  declarations: [OnlineStaffViewMyScheduleComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShiftInfoModule
  ],
  exports: [
    OnlineStaffViewMyScheduleComponent
  ]
})
export class OnlineStaffViewMySheduleModule {
}
