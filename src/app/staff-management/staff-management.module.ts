import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {StaffManagementComponent} from './staff-management.component';
import {StaffManagementRoutingModule} from './staff-management-routing.module';
import {MaterialModule} from '../shared/material.module';
import {MatSortModule, MatTableModule} from '@angular/material';
import {FuseSidebarModule} from '@theme/components';
import {StaffManagementSidebarsModule} from './components/staff-management-sidebars/staff-management-sidebars.module';
import {CdkDetailRowDirective} from './components/cdk-detail-row.directive';
import { StaffProfileComponent } from './components/staff-profile/staff-profile.component';
import {StaffProfileModule} from './components/staff-profile/staff-profile.module';
import { IntelyproProfileComponent } from './components/intelypro-profile/intelypro-profile.component';
import {IntelyproProfileModule} from './components/intelypro-profile/intelypro-profile.module';
import {ShiftDayCombinationsModule} from './components/shift-day-combinations/shift-day-combinations.module';

@NgModule({
  declarations: [
    StaffManagementComponent,
    CdkDetailRowDirective,
    StaffProfileComponent,
    IntelyproProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    FuseSidebarModule,
    StaffManagementRoutingModule,
    StaffManagementSidebarsModule,
    StaffProfileModule,
    IntelyproProfileModule,
    ShiftDayCombinationsModule
  ]
})
export class StaffManagementModule { }
