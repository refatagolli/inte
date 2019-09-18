import {NgModule} from '@angular/core';
import {ChangeUnitComponent} from './change-unit.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterialModule} from '../../../shared/material.module';
import {SelectableButtonGroupModule} from '../../../shared/componets/selectable-button-group/selectable-button-group.module';

@NgModule({
  declarations: [ChangeUnitComponent],
  imports: [
    SharedModule,
    MaterialModule,
  ],
  exports: [
    ChangeUnitComponent
  ]
})
export class ChangeUnitModule {
}
