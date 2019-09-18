import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FillShiftComponentComponent} from './fill-shift-component.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ManagementTopCardModule} from '../management-top-card/management-top-card.module';
import {UserFilterModule} from '../../../shared/componets/user-filter/user-filter.module';

@NgModule({
  declarations: [FillShiftComponentComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ManagementTopCardModule,
    UserFilterModule
  ],
  exports: [
    FillShiftComponentComponent
  ]
})
export class FillShiftComponentModule { }
