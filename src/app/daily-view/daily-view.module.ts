import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DailyViewRoutingModule} from './daily-view-routing.module';
import {DailyViewComponent} from './daily-view.component';
import {DailyViewHeaderComponent} from './components/daily-view-header/daily-view-header.component';
import {DailyCalendarComponent} from './components/daily-calendar/daily-calendar.component';
import {MaterialModule} from '../shared/material.module';
import {DailyContentComponent} from './components/daily-content/daily-content.component';
import {SharedModule} from '../shared/shared.module';
import {StaffMemberCardModule} from '../shared/componets/staff-member-card/staff-member-card.module';
import {RangeChipModule} from '../shared/componets/range-chip/range-chip.module';
import {StaffGroupingCardModule} from '../shared/componets/staff-grouping-card/staff-grouping-card.module';
import {StaffColumnModule} from '../shared/componets/staff-column/staff-column.module';
import {StaffCardModule} from '../shared/componets/staff-card/staff-card.module';
import {ChipIconModule} from '../shared/componets/chip-icon/chip-icon.module';
import {ShiftManagementModule} from '../shift-management/shift-management.module';
import {FuseSidebarModule} from '@theme/components';
import {StaffCardCheckboxModule} from '../shared/componets/staff-card-checkbox/staff-card-checkbox.module';
import {StaffCardConfirmationModule} from '../shared/componets/staff-card-confirmation/staff-card-confirmation.module';
import {MainMenuModule} from './components/main-menu/main-menu.module';
import {AddShiftModule} from '../shared/componets/add-shift/add-shift.module';

@NgModule({
  declarations: [
    DailyViewComponent,
    DailyViewHeaderComponent,
    DailyCalendarComponent,
    DailyContentComponent
  ],
  imports: [
    CommonModule,
    DailyViewRoutingModule,
    MaterialModule,
    SharedModule,
    StaffMemberCardModule,
    StaffGroupingCardModule,
    RangeChipModule,
    StaffColumnModule,
    StaffCardModule,
    ChipIconModule,
    ShiftManagementModule,
    FuseSidebarModule,
    StaffCardCheckboxModule,
    StaffCardConfirmationModule,
    MainMenuModule,
    AddShiftModule
  ]
})
export class DailyViewModule {
}
