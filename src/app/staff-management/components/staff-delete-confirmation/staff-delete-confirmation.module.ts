import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {StaffDeleteConfirmationComponent} from './staff-delete-confirmation.component';

@NgModule({
  declarations: [
    StaffDeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    StaffDeleteConfirmationComponent
  ],
  entryComponents: [
    StaffDeleteConfirmationComponent
  ]
})
export class StaffDeleteConfirmationModule { }
