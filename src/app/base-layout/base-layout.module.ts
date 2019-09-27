import {NgModule} from '@angular/core';
import {BaseLayoutComponent} from './base-layout.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FuseSidebarModule} from '@theme/components';
import {VerticalLayout2Module} from './vertical/layout-2/layout-2.module';
import {ShiftManagementModule} from '../shift-management/shift-management.module';
import {StaffManagementSidebarsModule} from '../staff-management/components/staff-management-sidebars/staff-management-sidebars.module';


@NgModule({
  imports: [
    CommonModule,
    VerticalLayout2Module,
    MatIconModule,
    FuseSidebarModule,
    ShiftManagementModule,
    StaffManagementSidebarsModule
  ],
  exports: [
    VerticalLayout2Module,
    BaseLayoutComponent
  ],
  declarations: [BaseLayoutComponent]
})
export class BaseLayoutModule {
}
