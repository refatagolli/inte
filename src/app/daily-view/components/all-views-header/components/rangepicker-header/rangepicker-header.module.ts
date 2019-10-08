import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RangepickerHeaderComponent} from './rangepicker-header.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';

@NgModule({
  declarations: [RangepickerHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    RangepickerHeaderComponent
  ]
})
export class RangepickerHeaderModule { }
