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

  areDatesEquals(d1, d2) {
    return new Date(d1).getDate() === new Date(d2).getDate();
  }


  changeDate(date) {
    this.config.date.currentDate = date;
    // this._dailyViewService.dailyViewConfig.next(this.config);
  }

  private getDateList() {
    const current = moment();

    const weekStart = current.clone().startOf('week');
    const weekEnd = current.clone().endOf('week');

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
}
