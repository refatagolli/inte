import {NgModule} from '@angular/core';
import {BaseLayoutComponent} from './base-layout.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material';
import {FuseSidebarModule} from '@theme/components';
import {VerticalLayout2Module} from './vertical/layout-2/layout-2.module';
import {ShiftManagementModule} from '../shift-management/shift-management.module';
import {StaffManagementSidebarsModule} from '../staff-management/components/staff-management-sidebars/staff-management-sidebars.module';
import {ManageMobileUserModule} from '../manage-mobile-user/manage-mobile-user.module';
import {MobileLoginModule} from '../mobile-login/mobile-login.module';
import {MobileForgotPasswordModule} from '../mobile-forgot-password/mobile-forgot-password.module';

@NgModule({
  imports: [
    CommonModule,
    VerticalLayout2Module,
    MatIconModule,
    FuseSidebarModule,
    ShiftManagementModule,
    StaffManagementSidebarsModule,
    ManageMobileUserModule,
    MobileLoginModule,
    MobileForgotPasswordModule
  ],
  exports: [
    VerticalLayout2Module,
    BaseLayoutComponent
  ],
  declarations: [BaseLayoutComponent]
})
export class BaseLayoutModule {
}
