import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from './main-menu.component';
import {MaterialModule} from '../../../shared/material.module';
import {SharedModule} from '../../../shared/shared.module';
import {UserTasksModule} from './components/user-tasks/user-tasks.module';
import {RequestIntelyproModule} from './components/request-intelypro/request-intelypro.module';
import {ShiftsToFillModule} from './components/shifts-to-fill/shifts-to-fill.module';
import {RequestsModule} from './components/requests/requests.module';
import {CustomDatepickerModule} from '../../../shared/componets/custom-datepicker/custom-datepicker.module';
import {CustomMonthpickerModule} from '../../../shared/componets/custom-monthpicker/custom-monthpicker.module';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,

    UserTasksModule,
    RequestIntelyproModule,
    ShiftsToFillModule,
    RequestsModule,
    CustomDatepickerModule,
    CustomMonthpickerModule
  ],
  exports: [
    MainMenuComponent
  ]
})
export class MainMenuModule {
}
