import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddShiftComponent } from './add-shift.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [AddShiftComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    AddShiftComponent
  ]
})
export class AddShiftModule { }
