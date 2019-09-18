import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {NavbarVerticalStyle2Component} from './style-2.component';
import {FuseNavigationModule} from '@theme/components';
import {SharedModule} from '../../../../../shared/shared.module';


@NgModule({
  declarations: [
    NavbarVerticalStyle2Component
  ],
  imports: [
    MatButtonModule,
    MatIconModule,

    SharedModule,
    FuseNavigationModule
  ],
  exports: [
    NavbarVerticalStyle2Component
  ]
})
export class NavbarVerticalStyle2Module {
}
