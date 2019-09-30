import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeeklyDataContainerComponent} from './weekly-data-container.component';
import {MaterialModule} from '../../../../../shared/material.module';
import {SharedModule} from '../../../../../shared/shared.module';
import {PersonelContainerModule} from '../personel-container/personel-container.module';

@NgModule({
  declarations: [WeeklyDataContainerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    PersonelContainerModule
  ],
  exports: [
    WeeklyDataContainerComponent
  ]
})
export class WeeklyDataContainerModule {
}
