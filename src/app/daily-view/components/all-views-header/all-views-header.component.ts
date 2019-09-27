import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {MatDialog} from '@angular/material';
import {PrintViewComponent} from '../print-view/print-view.component';

@Component({
  selector: 'daily-view-header',
  templateUrl: './all-views-header.component.html',
  styleUrls: ['./all-views-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllViewsHeaderComponent implements OnInit {
  dailyViewConfig: DailyViewConfigModel;

  date: Date = new Date();

  constructor(private _dailyViewService: DailyViewService,
              private _dialog: MatDialog) {
  }

  ngOnInit() {
    this._dailyViewService.dailyViewConfig.subscribe(dailyViewConfig => {
      this.dailyViewConfig = dailyViewConfig;
    });
  }

  changeDateRange(dateRange: 'daily' | 'weekly' | 'monthly') {
    this.dailyViewConfig.dateRange = dateRange;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }

  openPrint() {
    this._dialog.open(PrintViewComponent, {
      width: '600px',
      // height: '600px'
    });
  }

  goToToday() {
    this.dailyViewConfig.date = new Date().getTime();
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }
}
