import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import * as moment from 'moment';

@Component({
  selector: 'daily-calendar',
  templateUrl: './all-views-calendar.component.html',
  styleUrls: ['./all-views-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllViewsCalendarComponent implements OnInit {

  private static DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
  dateList: number[] = [];
  currentDate: number = new Date().getTime();
  config: DailyViewConfigModel;

  constructor(private _dailyViewService: DailyViewService) {
    this._dailyViewService.dailyViewConfig.subscribe(config => {
      this.config = config;
    });
    // temporary code
    this.getDateList();
    // this.changeDate(this.currentDate);
  }

  ngOnInit() {
  }

  areDatesEquals(d1, d2) {
    return new Date(d1).getDate() === new Date(d2).getDate();
  }

  getDateList() {
    const current = moment();

    const weekStart = current.clone().startOf('week');
    const weekEnd = current.clone().endOf('week');

    const first = weekStart.toDate().getTime() + AllViewsCalendarComponent.DAY_IN_MILLIS;
    let last = weekEnd.toDate().getTime() + AllViewsCalendarComponent.DAY_IN_MILLIS;

    while (last > first) {
      last -= AllViewsCalendarComponent.DAY_IN_MILLIS;
      this.dateList.unshift(last);
    }
  }

  changeDate(date) {
    this.config.date.currentDate = date;
    this._dailyViewService.dailyViewConfig.next(this.config);
  }

  setToCurrent() {
    this.config.date.currentDate = this.currentDate;
    this._dailyViewService.dailyViewConfig.next(this.config);
  }
}
