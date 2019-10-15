import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomDatepickerComponent} from '../../../../../shared/componets/custom-datepicker/custom-datepicker.component';

@Component({
  selector: 'rangepicker-modal',
  templateUrl: './rangepicker-modal.component.html',
  styleUrls: ['./rangepicker-modal.component.scss']
})
export class RangepickerModalComponent implements OnInit {

  currentRange ;
  tempRange = 0;
  chooseMonth: boolean;
  currentDate;
  nextMonth;

  @ViewChild('nextMonthDatePicker') private _nextMonthDatePicker: CustomDatepickerComponent;

  constructor(private _dialogRef: MatDialogRef<RangepickerModalComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) private _data) {

  }

  ngOnInit() {
    this.currentRange = this._data ?  this._data.range : {
      start: 0,
      end: 0
    };
    this.currentDate = this._data ? this._data.currentDate : moment();
    this.nextMonth = this.currentDate.clone().add(1, 'months');

  }

  setRange() {
    this._dialogRef.close(this.currentRange);
  }

  changeMonthStart(newMonthIndex: number) {
    if (this.currentDate.month() !== newMonthIndex) {
      this.currentDate = moment().month(newMonthIndex);
      this.nextMonth = this.currentDate.clone().add(1, 'months');
      this._nextMonthDatePicker.rebuildView(this.nextMonth.clone());
      this.currentRange = {start: 0, end: 0};
    }
    this.chooseMonth = false;
  }
}
