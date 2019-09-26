import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardSystemShiftDetailsComponent} from './card-system-shift-details.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [CardSystemShiftDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    CardSystemShiftDetailsComponent
  ]
})
export class CardSystemShiftDetailsModule {
}
