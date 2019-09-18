import {NgModule} from '@angular/core';

import {InnerScrollDirective} from '@theme/directives/inner-scroll/inner-scroll.directive';
import {PerfectScrollbarDirective} from '@theme/directives/perfect-scrollbar/perfect-scrollbar.directive';
import {FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective} from '@theme/directives/mat-sidenav/mat-sidenav.directive';

@NgModule({
  declarations: [
    InnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    PerfectScrollbarDirective
  ],
  imports: [],
  exports: [
    InnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    PerfectScrollbarDirective
  ]
})
export class DirectivesModule {
}
