import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingHistoryComponent } from './rating-history.component';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [RatingHistoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    RatingHistoryComponent
  ],
  entryComponents: [
    RatingHistoryComponent
  ]
})
export class RatingHistoryModule { }
