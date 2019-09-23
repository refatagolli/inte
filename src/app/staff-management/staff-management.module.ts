import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {StaffManagementComponent} from './staff-management.component';
import {StaffManagementRoutingModule} from './staff-management-routing.module';
import {MaterialModule} from '../shared/material.module';
import {MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    StaffManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    StaffManagementRoutingModule
  ]
})
export class StaffManagementModule { }
