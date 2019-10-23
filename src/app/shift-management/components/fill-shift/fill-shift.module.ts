import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FillShiftComponent} from './fill-shift.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ManagementTopCardModule} from '../management-top-card/management-top-card.module';
import {ShiftManagementFilterModule} from '../shift-management-filter/shift-management-filter.module';
import {StaffCardCheckboxModule} from '../../../shared/componets/staff-card-checkbox/staff-card-checkbox.module';
import {StaffCardExpandableModule} from '../../../shared/componets/staff-card-expandable/staff-card-expandable.module';
import {ChipIconModule} from '../../../shared/componets/chip-icon/chip-icon.module';

@NgModule({
  declarations: [FillShiftComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ManagementTopCardModule,
    ShiftManagementFilterModule,
    StaffCardCheckboxModule,
    StaffCardExpandableModule,
    ChipIconModule
  ],
  exports: [
    FillShiftComponent
  ]
})
export class FillShiftModule {
}
