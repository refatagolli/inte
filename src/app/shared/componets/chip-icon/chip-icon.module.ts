import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChipIconComponent} from './chip-icon.component';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [
    ChipIconComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ChipIconComponent
  ]
})
export class ChipIconModule { }
