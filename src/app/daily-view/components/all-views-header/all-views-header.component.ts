import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {MatDialog} from '@angular/material';
import {PrintViewComponent} from '../print-view/print-view.component';
import {formatDate} from '@angular/common';

@Component({
  selector: 'daily-view-header',
  templateUrl: './all-views-header.component.html',
  styleUrls: ['./all-views-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllViewsHeaderComponent implements OnInit {
  dailyViewConfig: DailyViewConfigModel;


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

    this.goToToday();
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
    this.dailyViewConfig.dateRange = 'today';
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  openCustomModal(monthly: string) {

  }

  goForward() {
    let newConfig;
    switch (this.dailyViewConfig.dateRange) {
      case 'today' :
      case 'daily' :
        newConfig = {
          from: null,
          to: null,
          currentDate: this.dailyViewConfig.date.currentDate + 24 * 60 * 60 * 1000
        };
        break;
      case 'weekly' :
        newConfig = {
          from: this.dailyViewConfig.date.from + 7 * 24 * 60 * 60 * 1000,
          to: this.dailyViewConfig.date.to + 7 * 24 * 60 * 60 * 1000,
          currentDate: this.dailyViewConfig.date.from + 7 * 24 * 60 * 60 * 1000
        };
        break;
      case 'monthly' :
        newConfig = {
          from: this.dailyViewConfig.date.from + 31 * 24 * 60 * 60 * 1000,
          to: this.dailyViewConfig.date.to + 31 * 24 * 60 * 60 * 1000,
          currentDate: this.dailyViewConfig.date.from + 7 * 24 * 60 * 60 * 1000
        };
    }
    this.dailyViewConfig.date = newConfig;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  goBackwards() {
    let newConfig;
    switch (this.dailyViewConfig.dateRange) {
      case 'today' :
      case 'daily' :
        newConfig = {
          from: null,
          to: null,
          currentDate: this.dailyViewConfig.date.currentDate - 24 * 60 * 60 * 1000
        };
        break;
      case 'weekly' :
        newConfig = {
          from: this.dailyViewConfig.date.from - 7 * 24 * 60 * 60 * 1000,
          to: this.dailyViewConfig.date.to - 7 * 24 * 60 * 60 * 1000,
          currentDate: this.dailyViewConfig.date.from - 7 * 24 * 60 * 60 * 1000
        };
        break;
      case 'monthly' :
        newConfig = {
          from: this.dailyViewConfig.date.from - 31 * 24 * 60 * 60 * 1000,
          to: this.dailyViewConfig.date.to - 31 * 24 * 60 * 60 * 1000,
          currentDate: this.dailyViewConfig.date.from - 31 * 24 * 60 * 60 * 1000
        };
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
    const curr = new Date();
    const first = new Date(new Date().setDate(curr.getDate() - curr.getDay() + 1)).getTime();
    const last = new Date(new Date().setDate(curr.getDate() - curr.getDay() + 8)).getTime();

    this.dailyViewConfig.date.from = first;
    this.dailyViewConfig.date.to = last;
    this.dailyViewConfig.date.currentDate = new Date().getTime();
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);

  }

  private _setMonthly() {
    this.dailyViewConfig.date.from = new Date().setDate(1);
    this.dailyViewConfig.date.to = new Date().setDate(30);
    this.dailyViewConfig.date.currentDate = new Date().getTime();
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }
}
