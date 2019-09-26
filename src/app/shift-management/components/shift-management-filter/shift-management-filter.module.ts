import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftManagementFilterComponent} from './shift-management-filter.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {SelectableButtonGroupModule} from '../../../shared/componets/selectable-button-group/selectable-button-group.module';

@NgModule({
  declarations: [ShiftManagementFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    SelectableButtonGroupModule
  ],
  exports: [
    ShiftManagementFilterComponent
  ]
})
export class ShiftManagementFilterModule {
}
