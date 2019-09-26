import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftManagementComponent} from './shift-management.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../shared/material.module';
import {ShiftDetailsModule} from './components/shift-details/shift-details.module';
import {FillShiftModule} from './components/fill-shift/fill-shift.module';
import {ShiftsToFillModule} from './components/shifts-to-fill/shifts-to-fill.module';
import {RequestsModule} from './components/requests/requests.module';
import {RequestIntelyproModule} from './components/request-intelypro/request-intelypro.module';

@NgModule({
  declarations: [ShiftManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShiftDetailsModule,
    FillShiftModule,
    ShiftsToFillModule,
    RequestsModule,
    RequestIntelyproModule
  ],
  exports: [
    ShiftManagementComponent
  ]
})
export class ShiftManagementModule {
}
