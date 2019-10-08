import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShiftDetailsActionsComponent} from './shift-details-actions.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';
import {ShiftInfoModule} from '../../../shift-info/shift-info.module';

@NgModule({
  declarations: [ShiftDetailsActionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ShiftInfoModule
  ],
  exports: [
    ShiftDetailsActionsComponent
  ]
})
export class ShiftDetailsActionsModule {
}
