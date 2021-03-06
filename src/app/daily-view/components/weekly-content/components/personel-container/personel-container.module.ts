import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonelContainerComponent} from './personel-container.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MaterialModule} from '../../../../../shared/material.module';
import {StaffCardModule} from '../../../../../shared/componets/staff-card/staff-card.module';
import {AddShiftModule} from '../../../../../shared/componets/add-shift/add-shift.module';
import {WeeklyDatepickerModule} from '../weekly-datepicker/weekly-datepicker.module';
import {WeeklyDatepickerComponent} from '../weekly-datepicker/weekly-datepicker.component';

@NgModule({
  declarations: [PersonelContainerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StaffCardModule,
    AddShiftModule,
    WeeklyDatepickerModule
  ],
  exports: [
    PersonelContainerComponent
  ],
  entryComponents: [
    WeeklyDatepickerComponent
  ]
})
export class PersonelContainerModule {
}
