import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {AllViewsHeaderComponent} from './all-views-header.component';

@NgModule({
  declarations: [AllViewsHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [
    AllViewsHeaderComponent
  ]
})
export class AllViewsHeaderModule {
}
