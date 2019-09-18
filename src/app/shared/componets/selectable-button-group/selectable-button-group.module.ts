import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectableButtonGroupComponent} from './selectable-button-group.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [SelectableButtonGroupComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    SelectableButtonGroupComponent
  ]
})
export class SelectableButtonGroupModule {
}
