import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangepickerModalComponent } from './rangepicker-modal.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';
import {RangepickerHeaderModule} from '../rangepicker-header/rangepicker-header.module';
import {CustomDatepickerModule} from '../../../../../shared/componets/custom-datepicker/custom-datepicker.module';
import {CustomMonthpickerModule} from '../../../../../shared/componets/custom-monthpicker/custom-monthpicker.module';

@NgModule({
  declarations: [RangepickerModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CustomDatepickerModule,
    RangepickerHeaderModule,
    CustomMonthpickerModule
  ]
})
export class RangepickerModalModule { }
