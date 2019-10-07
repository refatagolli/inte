import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMonthpickerComponent } from './custom-monthpicker.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [CustomMonthpickerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    CustomMonthpickerComponent
  ]
})
export class CustomMonthpickerModule { }
