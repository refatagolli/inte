import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { FuseNavigationComponent } from './navigation.component';
import { FuseNavHorizontalItemComponent } from './horizontal/item/item.component';
import { FuseNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

    ],
    exports     : [
        FuseNavigationComponent
    ],
    declarations: [
        FuseNavigationComponent,
        FuseNavHorizontalItemComponent,
        FuseNavHorizontalCollapsableComponent
    ]
})
export class FuseNavigationModule
{
}
