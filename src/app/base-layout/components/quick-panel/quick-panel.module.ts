import { NgModule } from '@angular/core';
import { MatDividerModule, MatListModule, MatSlideToggleModule } from '@angular/material';
import {QuickPanelComponent} from './quick-panel.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports     : [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        SharedModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule
{
}
