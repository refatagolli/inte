import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffMemberCardComponent} from './staff-member-card.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';
import {RangeChipModule} from '../range-chip/range-chip.module';

@NgModule({
  declarations: [
    StaffMemberCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RangeChipModule,
  ],
  exports: [
    StaffMemberCardComponent
  ]
})
export class StaffMemberCardModule {
}