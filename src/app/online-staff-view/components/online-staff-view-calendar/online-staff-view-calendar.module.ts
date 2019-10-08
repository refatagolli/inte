import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffViewCalendarComponent} from './online-staff-view-calendar.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [OnlineStaffViewCalendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    OnlineStaffViewCalendarComponent
  ]
})
export class OnlineStaffViewCalendarModule {
}
