import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';
import {RangeChipComponent} from './range-chip.component';

@NgModule({
  declarations: [
    RangeChipComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    RangeChipComponent
  ]
})
export class RangeChipModule { }
