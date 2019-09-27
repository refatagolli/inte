import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {StaffManagementSidebarsComponent} from './staff-management-sidebars.component';
import {MaterialModule} from '../../../shared/material.module';
import {AddStaffModule} from '../add-staff/add-staff.module';

@NgModule({
  declarations: [
    StaffManagementSidebarsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AddStaffModule
  ],
  exports: [
    StaffManagementSidebarsComponent
  ],
})
export class StaffManagementSidebarsModule { }
