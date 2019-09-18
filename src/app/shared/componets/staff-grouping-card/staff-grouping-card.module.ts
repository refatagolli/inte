import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';
import {RangeChipModule} from '../range-chip/range-chip.module';
import {StaffGroupingCardComponent} from './staff-grouping-card.component';
import {ChipIconModule} from '../chip-icon/chip-icon.module';

@NgModule({
  declarations: [
    StaffGroupingCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RangeChipModule,
    ChipIconModule
  ],
  exports: [
    StaffGroupingCardComponent
  ]
})
export class StaffGroupingCardModule {
}
