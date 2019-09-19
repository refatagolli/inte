import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFilterComponent } from './user-filter.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';
import {SelectableButtonGroupModule} from '../selectable-button-group/selectable-button-group.module';

@NgModule({
  declarations: [UserFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    SelectableButtonGroupModule,
  ],
  exports: [
    UserFilterComponent
  ]
})
export class UserFilterModule { }
