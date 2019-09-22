import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftManagementComponent} from './shift-management.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../shared/material.module';
import {ShiftDetailsModule} from './components/shift-details/shift-details.module';
import {FillShiftModule} from './components/fill-shift/fill-shift.module';

@NgModule({
  declarations: [ShiftManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShiftDetailsModule,
    FillShiftModule
  ],
  exports: [
    ShiftManagementComponent
  ]
})
export class ShiftManagementModule {
}
