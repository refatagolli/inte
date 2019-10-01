import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShiftDayCombinationsComponent} from './shift-day-combinations.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [
    ShiftDayCombinationsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ShiftDayCombinationsComponent
  ],
  entryComponents: [
    ShiftDayCombinationsComponent
  ]
})
export class ShiftDayCombinationsModule { }
