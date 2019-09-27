import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrintViewComponent} from './print-view.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {ViewTypeModule} from '../view-type/view-type.module';
import {ChipIconModule} from '../../../shared/componets/chip-icon/chip-icon.module';
import {StaffCardRadioModule} from '../../../shared/componets/staff-card-radio/staff-card-radio.module';

@NgModule({
  declarations: [PrintViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ViewTypeModule,
    ChipIconModule,
    StaffCardRadioModule
  ],
  exports: [
    PrintViewComponent
  ],
  entryComponents: [
    PrintViewComponent
  ]
})
export class PrintViewModule {
}
