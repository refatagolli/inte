import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomDatepickerComponent implements OnInit {

  private static DAY_LENGTH = 24 * 60 * 60 * 1000;

  calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weeks = [];
  selectedDate;

  @Input() selectRange = true;
  @Input() range = {
    start: 0,
    end: 0
  };
  @Input() currentDate = moment();
  @Output() dateChange: EventEmitter<any> = new EventEmitter();
  @Input() tempEndRange;
  @Output() tempEndRangeChange: EventEmitter<any> = new EventEmitter();
  @Input() maxRangeDays: number;

  constructor() {
  }

  ngOnInit() {
    const currentMonth = this.currentDate.month();
    this._removeHours(this.currentDate.date(1));
    this._fillWeeks(this.currentDate, currentMonth);
  }

  selectDate(date: number) {
    if (!this.selectRange) {
      this.selectedDate = date;
    } else {
      if (!this.range.start) {
        this.range.start = date;
      } else if (!this.range.end) {
        if (date > this.range.start) {
          this.range.end = date;
        } else {
          this.range.start = date;
        }
      } else {
        this.range.start = date;
        this.range.end = 0;
      }

      this.dateChange.emit(this.range);
      this.tempEndRangeChange.emit(0);
    }
  }

  rebuildView(newDate: moment.Moment) {
    this.currentDate = newDate;
    const currentMonth = this.currentDate.month();
    this._removeHours(this.currentDate.date(1));
    this._fillWeeks(this.currentDate, currentMonth);
  }

  isSelectedDate(date: any) {
    if (!this.selectRange && this.selectedDate === date.date) {
      return true;
    } else {
      return this.range.end === date.date || this.range.start === date.date;
    }
  }

  isBetweenRange(date: any) {
    if (this.selectRange && !!this.range.start) {
      return date.date >= this.range.start && (date.date <= this.range.end || date.date <= this.tempEndRange);
    }
  }

  isLeftSelected(days, index) {
    if (this.selectRange && !!this.range.start) {
      return index > 0 && (days[index - 1].date < this.range.end || days[index - 1].date < this.tempEndRange) &&
        this.isBetweenRange(days[index - 1]);
    }
  }

  isRightSelected(days, index) {
    if (this.selectRange && !!this.range.start) {
      return index < 6 && days[index + 1].date > this.range.start && this.isBetweenRange(days[index + 1]);
    }
  }

  viewRange(date: any) {
    if (this.selectRange && !!this.range.start && !this.range.end) {
      this.tempEndRange = date;
      this.tempEndRangeChange.next(this.tempEndRange);
    }
  }

  isStartOfMonth(date) {
    return moment(date).date() === moment(date).startOf('month').date();
  }

  isEndOfMonth(date) {
    return moment(date).date() === moment(date).endOf('month').date();
  }

  isDateDisabled(date: any) {
    if (this.maxRangeDays) {
      return this.range.start && this.range.start < date - this.maxRangeDays * CustomDatepickerComponent.DAY_LENGTH;
    }
    return false;
  }

  private _fillWeeks(date: moment.Moment, month: number) {

    this.weeks = [];
    let idx: number = date.month();
    let done = false;
    let count = 0;
    date = date.clone();
    while (!done) {
      this.weeks.push({
        days: this._addDays(date.clone(), month)
      });
      date.add(1, 'w');
      done = count++ > 2 && idx !== date.month();
      idx = date.month();
    }
  }

  private _addDays(date: moment.Moment, month: number) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push({
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month,
        isToday: date.isSame(new Date(), 'day'),
        date: date.toDate().getTime()
      });
      date = date.clone();
      date.add(1, 'd');
    }
    return days;
  }

  private _removeHours(date: moment.Moment) {
    date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }
}
