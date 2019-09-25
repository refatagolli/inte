import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomOptionSetComponent} from './custom-option-set.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [CustomOptionSetComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  exports: [
    CustomOptionSetComponent
  ]
})
export class CustomOptionSetModule { }
