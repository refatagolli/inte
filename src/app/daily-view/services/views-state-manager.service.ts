import {Injectable} from '@angular/core';
import {DailyViewService} from '../../services/daily-view.service';
import {DailyViewConfigModel} from '../../models/daily-view-config-model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ViewsStateManagerService {
  private static DAY_IN_MILLIS = 24 * 60 * 60 * 1000;

  dailyViewConfig: DailyViewConfigModel;

  constructor(private _dailyViewService: DailyViewService) {

    this._dailyViewService.dailyViewConfig.subscribe(e => {
      this.dailyViewConfig = e;
    });
    // this.changeDateRange('monthly');
  }

  changeDateRange(dateRange: 'daily' | 'weekly' | 'monthly' | 'custom', from?: number, to?: number, current?: number) {
    this.dailyViewConfig.dateRange = dateRange;
    dateRange === 'daily' ? this._setDaily() : dateRange === 'weekly' ? this._setWeekly() : dateRange === 'monthly' ?
      this._setMonthly() : this._setCustom(from, to, current);
  }

  goForward() {
    let newConfig;
    switch (this.dailyViewConfig.dateRange) {
      case 'daily' :
        newConfig = {
          from: null,
          to: null,
          currentDate: this.dailyViewConfig.date.currentDate + ViewsStateManagerService.DAY_IN_MILLIS
        };
        break;
      case 'weekly' :
        newConfig = {
          from: this.dailyViewConfig.date.from + 7 * ViewsStateManagerService.DAY_IN_MILLIS,
          to: this.dailyViewConfig.date.to + 7 * ViewsStateManagerService.DAY_IN_MILLIS,
          currentDate: this.dailyViewConfig.date.from + 7 * ViewsStateManagerService.DAY_IN_MILLIS
        };
        break;
      case 'monthly' :
        const m = moment(this.dailyViewConfig.date.from).add(1, 'months');
        newConfig = {
          from: m.clone().startOf('month').toDate().getTime(),
          to: m.clone().endOf('month').toDate().getTime(),
          currentDate: m.clone().startOf('month').toDate().getTime()
        };
        break;
      case 'custom' :
        const diff = this.dailyViewConfig.date.to - this.dailyViewConfig.date.from;
        newConfig = {
          from: this.dailyViewConfig.date.from + diff + ViewsStateManagerService.DAY_IN_MILLIS,
          to: this.dailyViewConfig.date.to + diff + ViewsStateManagerService.DAY_IN_MILLIS,
          currentDate: this.dailyViewConfig.date.from + diff + ViewsStateManagerService.DAY_IN_MILLIS
        };
        break;
      default:
        newConfig = this.dailyViewConfig.date;
    }
    this.dailyViewConfig.date = newConfig;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  goBackwards() {
    let newConfig;
    switch (this.dailyViewConfig.dateRange) {
      case 'daily' :
        newConfig = {
          from: null,
          to: null,
          currentDate: this.dailyViewConfig.date.currentDate - ViewsStateManagerService.DAY_IN_MILLIS
        };
        break;
      case 'weekly' :
        newConfig = {
          from: this.dailyViewConfig.date.from - 7 * ViewsStateManagerService.DAY_IN_MILLIS,
          to: this.dailyViewConfig.date.to - 7 * ViewsStateManagerService.DAY_IN_MILLIS,
          currentDate: this.dailyViewConfig.date.from - 7 * ViewsStateManagerService.DAY_IN_MILLIS
        };
        break;
      case 'monthly' :
        const m = moment(this.dailyViewConfig.date.from).add(-1, 'months');
        newConfig = {
          from: m.clone().startOf('month').toDate().getTime(),
          to: m.clone().endOf('month').toDate().getTime(),
          currentDate: m.clone().startOf('month').toDate().getTime()
        };
        break;
      case 'custom' :
        const diff = this.dailyViewConfig.date.to - this.dailyViewConfig.date.from;
        newConfig = {
          from: this.dailyViewConfig.date.from - diff - ViewsStateManagerService.DAY_IN_MILLIS,
          to: this.dailyViewConfig.date.to - diff - ViewsStateManagerService.DAY_IN_MILLIS,
          currentDate: this.dailyViewConfig.date.from - diff + ViewsStateManagerService.DAY_IN_MILLIS
        };
        break;
      default:
        newConfig = this.dailyViewConfig.date;
    }
    this.dailyViewConfig.date = newConfig;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  private _setDaily() {
    this.dailyViewConfig.date.currentDate = new Date().getTime();
    this.dailyViewConfig.date.to = null;
    this.dailyViewConfig.date.from = null;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  private _setWeekly() {
    const current = moment();

    const weekStart = current.clone().startOf('isoWeek');
    const weekEnd = weekStart.clone().add(7, 'day');

    const first = weekStart.toDate().getTime();
    const last = weekEnd.toDate().getTime();

    this.dailyViewConfig.date.from = first;
    this.dailyViewConfig.date.to = last;
    this.dailyViewConfig.date.currentDate = current.toDate().getTime();
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  private _setMonthly() {

    const current = moment();

    const monthStart = current.clone().startOf('month');
    const monthEnd = current.clone().endOf('month');

    const first = monthStart.toDate().getTime();
    const last = monthEnd.toDate().getTime();
    this.dailyViewConfig.date.from = first;
    this.dailyViewConfig.date.to = last;
    this.dailyViewConfig.date.currentDate = current.toDate().getTime();
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  private _setCustom(from: number, to: number, current: number) {
    this.dailyViewConfig.date.currentDate = current;
    this.dailyViewConfig.date.to = to;
    this.dailyViewConfig.date.from = from;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }
}
