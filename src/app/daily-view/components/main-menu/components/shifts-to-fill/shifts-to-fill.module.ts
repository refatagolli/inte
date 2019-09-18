import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsToFillComponent } from './shifts-to-fill.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';

@NgModule({
  declarations: [ShiftsToFillComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    ShiftsToFillComponent
  ]
})
export class ShiftsToFillModule { }
