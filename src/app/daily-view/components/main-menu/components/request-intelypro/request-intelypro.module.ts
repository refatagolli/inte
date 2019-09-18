import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestIntelyproComponent } from './request-intelypro.component';
import {MaterialModule} from '../../../../../shared/material.module';
import {SharedModule} from '../../../../../shared/shared.module';

@NgModule({
  declarations: [RequestIntelyproComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    RequestIntelyproComponent
  ]
})
export class RequestIntelyproModule { }
