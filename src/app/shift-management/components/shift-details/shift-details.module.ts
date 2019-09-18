import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftDetailsComponent} from './shift-details.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ManagementTopCardModule} from '../management-top-card/management-top-card.module';
import {StaffCardExpandableModule} from '../../../shared/componets/staff-card-expandable/staff-card-expandable.module';
import {SelectableButtonGroupModule} from '../../../shared/componets/selectable-button-group/selectable-button-group.module';
import {ChangeShiftModule} from '../change-shift/change-shift.module';
import {ChangeUnitModule} from '../change-unit/change-unit.module';

@NgModule({
  declarations: [ShiftDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ManagementTopCardModule,
    StaffCardExpandableModule,
    SelectableButtonGroupModule,
    ChangeShiftModule,
    ChangeUnitModule
  ],
  exports: [
    ShiftDetailsComponent
  ]
})
export class ShiftDetailsModule {
}
