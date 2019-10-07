import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffViewOpenShiftsComponent} from './online-staff-view-open-shifts.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [OnlineStaffViewOpenShiftsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    OnlineStaffViewOpenShiftsComponent
  ]
})
export class OnlineStaffViewOpenShiftsModule {
}
