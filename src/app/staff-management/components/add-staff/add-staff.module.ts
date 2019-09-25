import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {AddStaffComponent} from './add-staff.component';
import {SelectableButtonGroupModule} from '../../../shared/componets/selectable-button-group/selectable-button-group.module';
import {CustomOptionSetModule} from '../../../shared/componets/custom-option-set/custom-option-set.module';

@NgModule({
  declarations: [AddStaffComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    SelectableButtonGroupModule,
    CustomOptionSetModule
  ],
  exports: [
    AddStaffComponent
  ]
})
export class AddStaffModule { }
