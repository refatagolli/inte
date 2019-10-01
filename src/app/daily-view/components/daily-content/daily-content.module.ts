import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {DailyContentComponent} from './daily-content.component';
import {StaffGroupingCardModule} from './components/staff-grouping-card/staff-grouping-card.module';
import {StaffMemberCardModule} from './components/staff-member-card/staff-member-card.module';

@NgModule({
  declarations: [DailyContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StaffGroupingCardModule,
    StaffGroupingCardModule,
    StaffMemberCardModule
  ],
  exports: [
    DailyContentComponent
  ]
})
export class DailyContentModule {
}
