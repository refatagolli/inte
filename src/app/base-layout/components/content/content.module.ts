import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


import {SharedModule} from '../../../shared/shared.module';
import {ContentComponent} from './content.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,

    RouterModule,
    SharedModule
  ],
  exports: [
    ContentComponent
  ]
})
export class ContentModule {
}
