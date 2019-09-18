import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {NavbarComponent} from './navbar.component';
import {NavbarVerticalStyle2Module} from './vertical/style-2/style-2.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    SharedModule,

    NavbarVerticalStyle2Module
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}
