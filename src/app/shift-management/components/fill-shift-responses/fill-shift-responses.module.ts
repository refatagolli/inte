import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FillShiftResponsesComponent} from './fill-shift-responses.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ShiftManagementFilterModule} from '../shift-management-filter/shift-management-filter.module';
import {StaffRequestResponsesModule} from '../staff-request-responses/staff-request-responses.module';
import {ManagementTopCardModule} from '../management-top-card/management-top-card.module';
import {StaffCardExpandableModule} from '../../../shared/componets/staff-card-expandable/staff-card-expandable.module';

@NgModule({
  declarations: [FillShiftResponsesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShiftManagementFilterModule,
    StaffRequestResponsesModule,
    ManagementTopCardModule,
    StaffCardExpandableModule
  ],
  exports: [
    FillShiftResponsesComponent
  ]
})
export class FillShiftResponsesModule {
}
