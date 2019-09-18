import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffCardCheckboxComponent } from './staff-card-checkbox.component';
import {SharedModule} from '../../shared.module';
import {ChipIconModule} from '../chip-icon/chip-icon.module';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [StaffCardCheckboxComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChipIconModule,
    MaterialModule
  ],
  exports: [
    StaffCardCheckboxComponent
  ]
})
export class StaffCardCheckboxModule { }
