import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChipIconComponent} from './chip-icon.component';
import {MaterialModule} from '../../material.module';
import {SharedModule} from '../../shared.module';

@NgModule({
  declarations: [
    ChipIconComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ChipIconComponent
  ]
})
export class ChipIconModule { }
