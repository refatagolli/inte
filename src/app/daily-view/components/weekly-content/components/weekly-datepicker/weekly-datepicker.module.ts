import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyDatepickerComponent } from './weekly-datepicker.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';
import {CustomDatepickerModule} from '../../../../../shared/componets/custom-datepicker/custom-datepicker.module';

@NgModule({
  declarations: [WeeklyDatepickerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CustomDatepickerModule
  ],
  exports: [
    WeeklyDatepickerComponent
  ]
})
export class WeeklyDatepickerModule { }
