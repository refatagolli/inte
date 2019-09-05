import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';

@Component({
  selector: 'daily-view-header',
  templateUrl: './daily-view-header.component.html',
  styleUrls: ['./daily-view-header.component.scss']
})
export class DailyViewHeaderComponent implements OnInit {
  slideToggleContrl: FormControl = new FormControl(true);
  dailyViewConfig: DailyViewConfigModel;

  date: Date = new Date();

  constructor(private _dailyViewService: DailyViewService) {
  }

  ngOnInit() {
    this.slideToggleContrl.valueChanges.subscribe(value => {
      this.dailyViewConfig.viewType = !value ? 'shift' : 'unit';
      this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
    });

    this._dailyViewService.dailyViewConfig.subscribe(dailyViewConfig => {
      this.dailyViewConfig = dailyViewConfig;
      this.slideToggleContrl.patchValue(dailyViewConfig.viewType !== 'shift', {emitEvent: false});
    });
  }

  changeDateRange(dateRange: 'daily'| 'weekly' | 'monthly') {
    this.dailyViewConfig.dateRange = dateRange;
    this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
  }
}
