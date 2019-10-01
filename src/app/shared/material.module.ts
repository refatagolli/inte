import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule, MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ScrollEventModule} from 'ngx-scroll-event';
import {DailyViewModule} from '../daily-view/daily-view.module';
import {DateRangePickerModule} from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatRadioModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatChipsModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatSlideToggleModule,
    ScrollingModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ScrollEventModule,
    DateRangePickerModule
  ]
})
export class MaterialModule {
}
