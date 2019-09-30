import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffMemberCardComponent} from './staff-member-card.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';
import {RangeChipModule} from '../../../../../shared/componets/range-chip/range-chip.module';
import {StaffCardModule} from '../../../../../shared/componets/staff-card/staff-card.module';
import {AddShiftModule} from '../../../../../shared/componets/add-shift/add-shift.module';

@NgModule({
  declarations: [
    StaffMemberCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RangeChipModule,
    StaffCardModule,
    AddShiftModule
  ],
  exports: [
    StaffMemberCardComponent
  ]
})
export class StaffMemberCardModule {
}
