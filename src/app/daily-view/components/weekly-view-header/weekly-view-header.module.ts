import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyViewHeaderComponent } from './weekly-view-header.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {AllViewsHeaderModule} from '../all-views-header/all-views-header.module';

@NgModule({
  declarations: [WeeklyViewHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    AllViewsHeaderModule

  ],
  exports: [
    WeeklyViewHeaderComponent
  ]
})
export class WeeklyViewHeaderModule { }
