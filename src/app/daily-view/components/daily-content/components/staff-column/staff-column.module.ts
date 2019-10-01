import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';
import {StaffColumnComponent} from './staff-column.component';
import {StaffMemberCardModule} from '../staff-member-card/staff-member-card.module';

@NgModule({
  declarations: [
    StaffColumnComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StaffMemberCardModule
  ],
  exports: [
    StaffColumnComponent
  ]
})
export class StaffColumnModule { }
