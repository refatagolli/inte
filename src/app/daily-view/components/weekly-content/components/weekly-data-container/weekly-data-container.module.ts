import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyDataContainerComponent } from './weekly-data-container.component';
import {MaterialModule} from '../../../../../shared/material.module';
import {SharedModule} from '../../../../../shared/shared.module';
import {StaffCardModule} from '../../../../../shared/componets/staff-card/staff-card.module';
import {AddShiftModule} from '../../../../../shared/componets/add-shift/add-shift.module';

@NgModule({
  declarations: [WeeklyDataContainerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StaffCardModule,
    AddShiftModule
  ],
  exports: [
    WeeklyDataContainerComponent
  ]
})
export class WeeklyDataContainerModule { }
