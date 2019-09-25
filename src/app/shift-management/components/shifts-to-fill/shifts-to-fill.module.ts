import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsToFillComponent } from './shifts-to-fill.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {CardSystemTopHeaderModule} from '../card-system-top-header/card-system-top-header.module';
import {CardSystemShiftDetailsModule} from '../card-system-shift-details/card-system-shift-details.module';

@NgModule({
  declarations: [ShiftsToFillComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CardSystemTopHeaderModule,
    CardSystemShiftDetailsModule
  ],
  exports: [
    ShiftsToFillComponent
  ]
})
export class ShiftsToFillModule { }
