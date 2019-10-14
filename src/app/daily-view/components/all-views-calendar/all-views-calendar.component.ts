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
  config: DailyViewConfigModel;

  constructor(private _dailyViewService: DailyViewService) {
    this._dailyViewService.dailyViewConfig.subscribe(config => {
      this.config = config;
      this.getDateList();
    });
  }

  ngOnInit() {
  }

  areDatesEquals(d1, d2) {
    return new Date(d1).getDate() === new Date(d2).getDate();
  }

  getDateList() {
    this.dateList = [];
    const current = moment(this.config.date.currentDate);

    const weekStart = current.clone().startOf('isoWeek');
    const weekEnd = weekStart.clone().add( 7, 'day');

    const first = weekStart.toDate().getTime();
    let last = weekEnd.toDate().getTime();

    while (last > first) {
      last -= AllViewsCalendarComponent.DAY_IN_MILLIS;
      this.dateList.unshift(last);
    }
  }

  changeDate(date) {
    this.config.date.currentDate = date;
    this._dailyViewService.dailyViewConfig.next(this.config);
  }

  goForward() {
    this.changeDate(this.config.date.currentDate + AllViewsCalendarComponent.DAY_IN_MILLIS);
  }

  goBackwards() {
    this.changeDate(this.config.date.currentDate - AllViewsCalendarComponent.DAY_IN_MILLIS);
  }
}
