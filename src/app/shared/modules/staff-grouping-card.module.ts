import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared.module';
import {MaterialModule} from './material.module';
import {RangeChipModule} from './range-chip.module';
import {StaffGroupingCardComponent} from '../componets/staff-grouping-card/staff-grouping-card.component';
import {ChipIconModule} from './chip-icon.module';

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
