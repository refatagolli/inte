import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffCardComponent} from '../componets/staff-card/staff-card.component';
import {SharedModule} from '../shared.module';
import {MaterialModule} from './material.module';
import {ChipIconModule} from './chip-icon.module';

@NgModule({
  declarations: [
    StaffCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ChipIconModule
  ],
  exports: [
    StaffCardComponent

  ]
})
export class StaffCardModule {
}
