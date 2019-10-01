import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';
import {RangeChipModule} from '../../../../../shared/componets/range-chip/range-chip.module';
import {StaffGroupingCardComponent} from './staff-grouping-card.component';
import {ChipIconModule} from '../../../../../shared/componets/chip-icon/chip-icon.module';
import {StaffColumnModule} from '../staff-column/staff-column.module';

@NgModule({
  declarations: [
    StaffGroupingCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RangeChipModule,
    ChipIconModule,
    StaffColumnModule
  ],
  exports: [
    StaffGroupingCardComponent
  ]
})
export class StaffGroupingCardModule {
}
