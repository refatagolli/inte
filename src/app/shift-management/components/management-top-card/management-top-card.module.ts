import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagementTopCardComponent} from './management-top-card.component';
import {MaterialModule} from '../../../shared/material.module';
import {ChipIconModule} from '../../../shared/componets/chip-icon/chip-icon.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [ManagementTopCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ChipIconModule
  ],
  exports: [
    ManagementTopCardComponent
  ]
})
export class ManagementTopCardModule {
}
