import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DailyViewRoutingModule} from './daily-view-routing.module';
import {DailyViewComponent} from './daily-view.component';
import {DailyViewHeaderComponent} from './components/daily-view-header/daily-view-header.component';
import {DailyCalendarComponent} from './components/daily-calendar/daily-calendar.component';
import {MaterialModule} from '../shared/modules/material.module';
import {DailyContentComponent} from './components/daily-content/daily-content.component';
import {SharedModule} from '../shared/shared.module';
import {StaffMemberCardModule} from '../shared/modules/staff-member-card.module';
import {RangeChipModule} from '../shared/modules/range-chip.module';
import {StaffGroupingCardModule} from '../shared/modules/staff-grouping-card.module';
import {StaffColumnModule} from '../shared/modules/staff-column.module';
import {StaffCardModule} from '../shared/modules/staff-card.module';
import {ChipIconModule} from '../shared/modules/chip-icon.module';

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
    ChipIconModule
  ]
})
export class DailyViewModule {
}
