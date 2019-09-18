import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';
import {StaffColumnComponent} from './staff-column.component';

@NgModule({
  declarations: [
    StaffColumnComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    StaffColumnComponent
  ]
})
export class StaffColumnModule { }
