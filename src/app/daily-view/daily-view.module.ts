import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DailyViewRoutingModule} from './daily-view-routing.module';
import {DailyViewComponent} from './daily-view.component';
import {AllViewsHeaderComponent} from './components/all-views-header/all-views-header.component';
import {AllViewsCalendarComponent} from './components/all-views-calendar/all-views-calendar.component';
import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {StaffCardModule} from '../shared/componets/staff-card/staff-card.module';
import {ChipIconModule} from '../shared/componets/chip-icon/chip-icon.module';
import {ShiftManagementModule} from '../shift-management/shift-management.module';
import {FuseSidebarModule} from '@theme/components';
import {StaffCardConfirmationModule} from '../shared/componets/staff-card-confirmation/staff-card-confirmation.module';
import {MainMenuModule} from './components/main-menu/main-menu.module';
import {ViewTypeModule} from './components/view-type/view-type.module';
import {WeeklyContentModule} from './components/weekly-content/weekly-content.module';
import {PrintViewModule} from './components/print-view/print-view.module';
import {DailyContentModule} from './components/daily-content/daily-content.module';
import {RangepickerModalModule} from './components/all-views-header/components/rangepicker-modal/rangepicker-modal.module';
import {RangepickerModalComponent} from './components/all-views-header/components/rangepicker-modal/rangepicker-modal.component';
import {AllViewsHeaderModule} from './components/all-views-header/all-views-header.module';
import {WeeklyViewHeaderModule} from './components/weekly-view-header/weekly-view-header.module';

@NgModule({
  declarations: [
    DailyViewComponent,
    AllViewsCalendarComponent,
  ],
  imports: [
    CommonModule,
    DailyViewRoutingModule,
    MaterialModule,
    SharedModule,
    StaffCardModule,
    ChipIconModule,
    ShiftManagementModule,
    FuseSidebarModule,
    StaffCardConfirmationModule,
    MainMenuModule,
    ViewTypeModule,
    DailyContentModule,
    WeeklyContentModule,
    PrintViewModule,
    RangepickerModalModule,
    AllViewsHeaderModule,
    WeeklyViewHeaderModule
  ],
  entryComponents: [
    RangepickerModalComponent
  ]
})
export class DailyViewModule {
}
