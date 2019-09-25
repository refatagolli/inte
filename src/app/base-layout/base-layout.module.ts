import {NgModule} from '@angular/core';
import {BaseLayoutComponent} from './base-layout.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FuseSidebarModule} from '@theme/components';
import {VerticalLayout2Module} from './vertical/layout-2/layout-2.module';
import {ShiftManagementModule} from '../shift-management/shift-management.module';
import {AddStaffModule} from '../staff-management/components/add-staff/add-staff.module';



@NgModule({
  imports: [
    CommonModule,
    VerticalLayout2Module,
    MatIconModule,
    FuseSidebarModule,
    ShiftManagementModule,
    AddStaffModule
  ],
  exports: [
    VerticalLayout2Module,
    BaseLayoutComponent
  ],
  declarations: [BaseLayoutComponent]
})
export class BaseLayoutModule {
}
