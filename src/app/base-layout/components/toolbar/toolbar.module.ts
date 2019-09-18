import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {ToolbarComponent} from './toolbar.component';
import {SharedModule} from '../../../shared/shared.module';
import {FuseSearchBarModule} from '@theme/components';
import {ChipIconModule} from '../../../shared/componets/chip-icon/chip-icon.module';
import {UserFilterModule} from '../../../shared/componets/user-filter/user-filter.module';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,

    SharedModule,
    FuseSearchBarModule,

    ChipIconModule,
    UserFilterModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule {
}
