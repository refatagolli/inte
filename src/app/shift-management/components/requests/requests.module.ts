import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {CardSystemTopHeaderModule} from '../card-system-top-header/card-system-top-header.module';
import {CardSystemShiftDetailsModule} from '../card-system-shift-details/card-system-shift-details.module';
import {StaffRequestResponsesModule} from '../staff-request-responses/staff-request-responses.module';

@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CardSystemTopHeaderModule,
    CardSystemShiftDetailsModule,
    StaffRequestResponsesModule
  ],
  exports: [
    RequestsComponent
  ]
})
export class RequestsModule { }
