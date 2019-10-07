import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffViewHeaderComponent} from './online-staff-view-header.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';

@NgModule({
  declarations: [OnlineStaffViewHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    OnlineStaffViewHeaderComponent
  ]
})
export class OnlineStaffViewHeaderModule {
}
