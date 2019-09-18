import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffCardExpandableComponent } from './staff-card-expandable.component';
import {MaterialModule} from '../../material.module';
import {SharedModule} from '../../shared.module';
import {ChipIconModule} from '../chip-icon/chip-icon.module';

@NgModule({
  declarations: [StaffCardExpandableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ChipIconModule
  ],
  exports: [
    StaffCardExpandableComponent
  ]
})
export class StaffCardExpandableModule { }
