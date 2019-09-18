import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffCardConfirmationComponent } from './staff-card-confirmation.component';
import {SharedModule} from '../../shared.module';
import {ChipIconModule} from '../chip-icon/chip-icon.module';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [StaffCardConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChipIconModule,
    MaterialModule
  ],
  exports: [
    StaffCardConfirmationComponent
  ]
})
export class StaffCardConfirmationModule { }
