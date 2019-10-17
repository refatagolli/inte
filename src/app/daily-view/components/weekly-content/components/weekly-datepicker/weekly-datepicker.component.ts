import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-weekly-datepicker',
  templateUrl: './weekly-datepicker.component.html',
  styleUrls: ['./weekly-datepicker.component.scss']
})
export class WeeklyDatepickerComponent implements OnInit {

  currentDate;
  maxDate;
  minDate;


  selectedDate;

  constructor(private _dialogRef: MatDialogRef<WeeklyDatepickerComponent>,
              @Inject(MAT_DIALOG_DATA)private _data: any) { }

  ngOnInit() {
    this.currentDate = this._data.currentDate;
    this.maxDate = this._data.maxDate;
    this.minDate = this._data.minDate;
  }

  onDateChange(date: any) {
    console.log(date);
    this.selectedDate = date;
  }

  selectDate() {
    this._dialogRef.close(this.selectedDate);
  }
}
