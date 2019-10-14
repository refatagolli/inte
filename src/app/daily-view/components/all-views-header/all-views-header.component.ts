import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {MatDialog} from '@angular/material';
import {PrintViewComponent} from '../print-view/print-view.component';
import {formatDate} from '@angular/common';
import * as moment from 'moment';
import {RangepickerModalComponent} from './components/rangepicker-modal/rangepicker-modal.component';
import {filter} from 'rxjs/operators';
import {ViewsStateManagerService} from '../../services/views-state-manager.service';

@Component({
  selector: 'daily-view-header',
  templateUrl: './all-views-header.component.html',
  styleUrls: ['./all-views-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllViewsHeaderComponent implements OnInit {

  @ViewChild('container', {read: ElementRef}) container: ElementRef;
  dailyViewConfig: DailyViewConfigModel;

  constructor(private _dailyViewService: DailyViewService,
              private _dialog: MatDialog,
              private _viewStateManager: ViewsStateManagerService,
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
  }

  changeDateRange(dateRange: 'daily' | 'weekly' | 'monthly') {
    this._viewStateManager.changeDateRange(dateRange);
  }

  openPrint() {
    this._dialog.open(PrintViewComponent, {
      width: '600px',
    });
  }

  goToToday() {
    this._viewStateManager.changeDateRange('daily');
  }

  openCustomModal() {
    let dialogData;
    if (this.dailyViewConfig.dateRange === 'custom') {
      dialogData = {
        currentDate: moment(this.dailyViewConfig.date.from),
        range: {
          start: this.dailyViewConfig.date.from,
          end: this.dailyViewConfig.date.to
        }
      };
    }

    this._dialog.open(RangepickerModalComponent, {
      panelClass: 'date-range-picker',
      backdropClass: 'invisible-backdrop',
      position: {
        top: this.getDateRangePickerTopOffset() + 'px'
      },
      data: dialogData
    }).afterClosed().pipe(
      filter(e => e)
    ).subscribe(e => {
      this._viewStateManager.changeDateRange('custom', e.start, e.end, e.start);
    });
  }

  goForward() {
    this._viewStateManager.goForward();
  }

  goBackwards() {
    this._viewStateManager.goBackwards();
  }

  getDateRangePickerTopOffset() {
    // console.log(this.container);
    // console.log(this.container.nativeElement.offsetTop + window.pageYOffset);
    // return this.container.nativeElement.offsetTop + window.pageYOffset;
    return 450;
  }
}
