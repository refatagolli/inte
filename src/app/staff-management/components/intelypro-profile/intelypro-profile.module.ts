import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {RatingHistoryModule} from '../rating-history/rating-history.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RatingHistoryModule
  ]
})
export class IntelyproProfileModule { }
