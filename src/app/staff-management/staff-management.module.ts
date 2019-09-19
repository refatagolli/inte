import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManagementComponent } from './staff-management.component';
import {StaffManagementRoutingModule} from './staff-management-routing.module';
import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [StaffManagementComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StaffManagementRoutingModule
  ]
})
export class StaffManagementModule { }
