import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftManagementComponent} from './shift-management.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../shared/material.module';
import {ShiftDetailsModule} from './components/shift-details/shift-details.module';
import {FillShiftComponentModule} from './components/fill-shift-component/fill-shift-component.module';

@NgModule({
  declarations: [ShiftManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShiftDetailsModule,
    FillShiftComponentModule
  ],
  exports: [
    ShiftManagementComponent
  ]
})
export class ShiftManagementModule {
}
