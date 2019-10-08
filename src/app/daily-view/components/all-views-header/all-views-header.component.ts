import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {MatDialog} from '@angular/material';
import {PrintViewComponent} from '../print-view/print-view.component';
import {formatDate} from '@angular/common';
import * as moment from 'moment';
import {RangepickerModalComponent} from './components/rangepicker-modal/rangepicker-modal.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'daily-view-header',
  templateUrl: './all-views-header.component.html',
  styleUrls: ['./all-views-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllViewsHeaderComponent implements OnInit {

  private static DAY_IN_MILLIS = 24 * 60 * 60 * 1000;
  dailyViewConfig: DailyViewConfigModel;
  @ViewChild('container', {read: ElementRef}) container: ElementRef;

  constructor(private _dailyViewService: DailyViewService,
              private _dialog: MatDialog,
              private _cdr: ChangeDetectorRef) {
  }

  get date() {
    if (!this.dailyViewConfig.date.to && !this.dailyViewConfig.date.from) {
      return formatDate(this.dailyViewConfig.date.currentDate, 'EEEE MMM d', 'en');
    } else {
      const f = new Date(this.dailyViewConfig.date.from);
      const l = new Date(this.dailyViewConfig.date.to);

      if (f.getMonth() === l.getMonth()) {
        return formatDate(this.dailyViewConfig.date.currentDate, 'EEE', 'en') + ' '
          + formatDate(this.dailyViewConfig.date.from, 'MMM d', 'en') + '-'
          + formatDate(this.dailyViewConfig.date.to, 'd', 'en');
      } else {
        return formatDate(this.dailyViewConfig.date.from, 'MMM d', 'en') + '-' + formatDate(this.dailyViewConfig.date.to, 'MMM d', 'en');
      }
    }
  }

  ngOnInit() {
    this._dailyViewService.dailyViewConfig.subscribe(dailyViewConfig => {
      this.dailyViewConfig = dailyViewConfig;
    });

    this.changeDateRange('daily');
    this.getDateRangePickerTopOffset();
  }

  changeDateRange(dateRange: 'daily' | 'weekly' | 'monthly') {
    this.dailyViewConfig.dateRange = dateRange;
    dateRange === 'daily' ? this._setDaily() : dateRange === 'weekly' ? this._setWeekly() : this._setMonthly();
  }

  openPrint() {
    this._dialog.open(PrintViewComponent, {
      width: '600px',
    });
  }

  goToToday() {
    this.dailyViewConfig.date.currentDate = new Date().getTime();
    this.dailyViewConfig.date.to = null;
    this.dailyViewConfig.date.from = null;
    this.dailyViewConfig.dateRange = 'daily';
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  openCustomModal() {
    this._dialog.open(RangepickerModalComponent, {
      panelClass: 'date-range-picker',
      backdropClass: 'invisible-backdrop',
      position : {
        top: this.getDateRangePickerTopOffset() + 'px'
      }
    }).afterClosed().pipe(
      filter(e => e)
    ).subscribe(e => {
      this.dailyViewConfig.date.currentDate = e.start;
      this.dailyViewConfig.date.to = e.end;
      this.dailyViewConfig.date.from = e.start;
      this.dailyViewConfig.dateRange = 'custom';
      this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
    });
  }

  goForward() {
    let newConfig;
    switch (this.dailyViewConfig.dateRange) {
      case 'daily' :
        newConfig = {
          from: null,
          to: null,
          currentDate: this.dailyViewConfig.date.currentDate + AllViewsHeaderComponent.DAY_IN_MILLIS
        };
        break;
      case 'weekly' :
        newConfig = {
          from: this.dailyViewConfig.date.from + 7 * AllViewsHeaderComponent.DAY_IN_MILLIS,
          to: this.dailyViewConfig.date.to + 7 * AllViewsHeaderComponent.DAY_IN_MILLIS,
          currentDate: this.dailyViewConfig.date.from + 7 * AllViewsHeaderComponent.DAY_IN_MILLIS
        };
        break;
      case 'monthly' :
        const m = moment(this.dailyViewConfig.date.from).add(1, 'months');
        newConfig = {
          from: m.clone().startOf('month').toDate().getTime(),
          to: m.clone().endOf('month').toDate().getTime(),
          currentDate: m.clone().startOf('month').toDate().getTime()
        };
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
          currentDate: this.dailyViewConfig.date.currentDate - AllViewsHeaderComponent.DAY_IN_MILLIS
        };
        break;
      case 'weekly' :
        newConfig = {
          from: this.dailyViewConfig.date.from - 7 * AllViewsHeaderComponent.DAY_IN_MILLIS,
          to: this.dailyViewConfig.date.to - 7 * AllViewsHeaderComponent.DAY_IN_MILLIS,
          currentDate: this.dailyViewConfig.date.from - 7 * AllViewsHeaderComponent.DAY_IN_MILLIS
        };
        break;
      case 'monthly' :
        const m = moment(this.dailyViewConfig.date.from).add(-1, 'months');
        newConfig = {
          from: m.clone().startOf('month').toDate().getTime(),
          to: m.clone().endOf('month').toDate().getTime(),
          currentDate: m.clone().startOf('month').toDate().getTime()
        };
    }
    this.dailyViewConfig.date = newConfig;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  getDateRangePickerTopOffset() {
    console.log(this.container);
    return this.container.nativeElement.offsetTop + window.pageYOffset;
  }

  private _setDaily() {
    this.dailyViewConfig.date.currentDate = new Date().getTime();
    this.dailyViewConfig.date.to = null;
    this.dailyViewConfig.date.from = null;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  private _setWeekly() {
    const current = moment();

    const weekStart = current.clone().startOf('week');
    const weekEnd = current.clone().endOf('week');

    const first = weekStart.toDate().getTime() + AllViewsHeaderComponent.DAY_IN_MILLIS;
    const last = weekEnd.toDate().getTime() + AllViewsHeaderComponent.DAY_IN_MILLIS;

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

}
