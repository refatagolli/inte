import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTypeComponent } from './view-type.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [ViewTypeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    ViewTypeComponent
  ]
})
export class ViewTypeModule { }
