import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatepickerComponent } from './custom-datepicker.component';
import {MaterialModule} from '../../material.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  declarations: [CustomDatepickerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    CustomDatepickerComponent
  ]
})
export class CustomDatepickerModule { }
