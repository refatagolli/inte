import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffRequestResponsesComponent} from './staff-request-responses.component';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {StaffCardConfirmationModule} from '../../../shared/componets/staff-card-confirmation/staff-card-confirmation.module';

@NgModule({
  declarations: [StaffRequestResponsesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StaffCardConfirmationModule
  ],
  exports: [
    StaffRequestResponsesComponent
  ]
})
export class StaffRequestResponsesModule {
}
