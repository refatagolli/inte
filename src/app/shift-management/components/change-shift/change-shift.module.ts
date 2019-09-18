import {NgModule} from '@angular/core';
import {ChangeShiftComponent} from './change-shift.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {SelectableButtonGroupModule} from '../../../shared/componets/selectable-button-group/selectable-button-group.module';

@NgModule({
  declarations: [ChangeShiftComponent],
  imports: [
    SharedModule,
    MaterialModule,
    SelectableButtonGroupModule

  ],
  exports: [ChangeShiftComponent]
})
export class ChangeShiftModule {
}
