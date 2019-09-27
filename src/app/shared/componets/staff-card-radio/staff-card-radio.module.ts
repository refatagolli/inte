import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffCardRadioComponent} from './staff-card-radio.component';
import {MaterialModule} from '../../material.module';
import {SharedModule} from '../../shared.module';
import {ChipIconModule} from '../chip-icon/chip-icon.module';

@NgModule({
  declarations: [StaffCardRadioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ChipIconModule
  ],
  exports: [
    StaffCardRadioComponent
  ]
})
export class StaffCardRadioModule {
}
