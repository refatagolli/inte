import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {DirectivesModule} from '@theme/directives/directives';
import {FusePipesModule} from '@theme/pipes/pipes.module';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DirectivesModule
  ],
  declarations: []
})
export class SharedModule {
}
