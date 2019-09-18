import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestsComponent} from './requests.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';

@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [RequestsComponent]
})
export class RequestsModule {
}
