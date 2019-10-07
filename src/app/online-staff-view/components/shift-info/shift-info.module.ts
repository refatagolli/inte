import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftInfoComponent } from './shift-info.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [ShiftInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    ShiftInfoComponent
  ]
})
export class ShiftInfoModule { }
