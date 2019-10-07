import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffViewComponent} from './online-staff-view.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../shared/material.module';
import {OnlineStaffViewRoutingModule} from './online-staff-view-routing.module';
import {OnlineStaffViewHeaderModule} from './components/online-staff-view-header/online-staff-view-header.module';
import {OnlineStaffViewCalendarModule} from './components/online-staff-view-calendar/online-staff-view-calendar.module';
import {OnlineStaffViewMySheduleModule} from './components/online-staff-view-my-schedule/online-staff-view-my-shedule.module';
import {OnlineStaffViewResponsesModule} from './components/online-staff-view-responses/online-staff-view-responses.module';
import {OnlineStaffViewOpenShiftsModule} from './components/online-staff-view-open-shifts/online-staff-view-open-shifts.module';

@NgModule({
  declarations: [OnlineStaffViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    OnlineStaffViewRoutingModule,
    OnlineStaffViewHeaderModule,
    OnlineStaffViewCalendarModule,
    OnlineStaffViewMySheduleModule,
    OnlineStaffViewResponsesModule,
    OnlineStaffViewOpenShiftsModule
  ]
})
export class OnlineStaffViewModule {
}
