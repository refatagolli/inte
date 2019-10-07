import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {MatDialogRef} from '@angular/material';
import {CustomDatepickerComponent} from '../../../../../shared/componets/custom-datepicker/custom-datepicker.component';

@Component({
  selector: 'rangepicker-modal',
  templateUrl: './rangepicker-modal.component.html',
  styleUrls: ['./rangepicker-modal.component.scss']
})
export class RangepickerModalComponent implements OnInit {

  currentRange = {
    start: 0,
    end: 0
  };
  tempRange = 0;
  chooseMonth: boolean;
  currentDate = moment();
  nextMonth = this.currentDate.clone().add(1, 'months');

  @ViewChild('nextMonthDatePicker') private _nextMonthDatePicker: CustomDatepickerComponent;

  constructor(private _dialogRef: MatDialogRef<RangepickerModalComponent>) {
  }

  ngOnInit() {
  }


  setRange() {
    this._dialogRef.close(this.currentRange);
  }

  changeMonthStart(newMonthIndex: number) {
    this.currentDate = moment().month(newMonthIndex);
    this.nextMonth = this.currentDate.clone().add(1, 'months');
    this._nextMonthDatePicker.rebuildView(this.nextMonth.clone());
    this.currentRange = {start: 0, end: 0};
    this.chooseMonth = false;
  }
}
