import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestIntelyproComponent } from './request-intelypro.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {CardSystemTopHeaderModule} from '../card-system-top-header/card-system-top-header.module';
import {CardSystemShiftDetailsModule} from '../card-system-shift-details/card-system-shift-details.module';

@NgModule({
  declarations: [RequestIntelyproComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CardSystemTopHeaderModule,
    CardSystemShiftDetailsModule
  ],
  exports: [
    RequestIntelyproComponent
  ]
})
export class RequestIntelyproModule { }
