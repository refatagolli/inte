import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeeklyContentComponent} from './weekly-content.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ViewTypeModule} from '../view-type/view-type.module';
import {WeeklyDataContainerModule} from './components/weekly-data-container/weekly-data-container.module';
import {AllViewsHeaderModule} from '../all-views-header/all-views-header.module';

@NgModule({
  declarations: [WeeklyContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ViewTypeModule,
    WeeklyDataContainerModule,
    AllViewsHeaderModule
  ],
  exports: [
    WeeklyContentComponent
  ]
})
export class WeeklyContentModule {
}
