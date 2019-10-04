import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShiftDayCombinationsComponent} from './shift-day-combinations.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {CustomOptionSetModule} from '../../../shared/componets/custom-option-set/custom-option-set.module';

@NgModule({
  declarations: [
    ShiftDayCombinationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    CustomOptionSetModule
  ],
  exports: [
    ShiftDayCombinationsComponent
  ],
  entryComponents: [
    ShiftDayCombinationsComponent
  ]
})
export class ShiftDayCombinationsModule { }
