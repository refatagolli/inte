import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSystemTopHeaderComponent } from './card-system-top-header.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [CardSystemTopHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    CardSystemTopHeaderComponent
  ]
})
export class CardSystemTopHeaderModule { }
