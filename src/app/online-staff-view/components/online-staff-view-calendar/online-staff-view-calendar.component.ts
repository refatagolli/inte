import {Component, OnInit} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import * as moment from 'moment';

@Component({
  selector: 'online-staff-view-calendar',
  templateUrl: './online-staff-view-calendar.component.html',
  styleUrls: ['./online-staff-view-calendar.component.scss']
})
export class OnlineStaffViewCalendarComponent implements OnInit {
  private static DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
  monthList: string[];
  dateList: any[] = [];
  currentDate = moment();
  selectedMonth = this.currentDate.month();
  private config: DailyViewConfigModel;

  constructor(private _dailyViewService: DailyViewService) {
  }

  ngOnInit(): void {
    this._dailyViewService.dailyViewConfig.subscribe(config => {
      this.config = config;
    });
    this.getDateList();
    this._getMonthList();
  }

  areDatesEquals(d) {
    const d1 = moment(d);
    const dn = moment()
    return d1.month() === dn.month() &&
      d1.date() === dn.date();
  }

  private getDateList() {
    this.dateList = [];
    const weekStart = this.currentDate.clone().startOf('week');
    const weekEnd = this.currentDate.clone().endOf('week');

    const first = weekStart.toDate().getTime() + 2 * OnlineStaffViewCalendarComponent.DAY_IN_MILLIS;
    let last = weekEnd.toDate().getTime() + 2 * OnlineStaffViewCalendarComponent.DAY_IN_MILLIS;

    while (last > first) {
      last -= OnlineStaffViewCalendarComponent.DAY_IN_MILLIS;
      this.dateList.unshift(last);
    }
  }

  private _getMonthList() {
    this.monthList = moment.months();
  }

  changeWeek(forward: boolean) {
    this.currentDate.add( forward ? 1 : -1, 'week');
    this.selectedMonth = this.currentDate.month();
    this.getDateList();
  }

  changeMonth(month: number) {
    console.log(month);
    this.currentDate = moment().clone().months(month + 1);
    this.selectedMonth = this.currentDate.month();
  }
}
