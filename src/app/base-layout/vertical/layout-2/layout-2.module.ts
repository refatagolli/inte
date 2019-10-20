import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../../shared/shared.module';
import {FuseSidebarModule} from '@theme/components';
import {ContentModule} from '../../components/content/content.module';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {QuickPanelModule} from '../../components/quick-panel/quick-panel.module';
import {ToolbarModule} from '../../components/toolbar/toolbar.module';
import {VerticalLayout2Component} from './layout-2.component';
import {MainMenuModule} from '../../../daily-view/components/main-menu/main-menu.module';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    VerticalLayout2Component
  ],
  imports: [
    RouterModule,

    SharedModule,
    FuseSidebarModule,

    ContentModule,
    NavbarModule,
    QuickPanelModule,
    ToolbarModule,
    MainMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    VerticalLayout2Component
  ]
})
export class VerticalLayout2Module {
}
