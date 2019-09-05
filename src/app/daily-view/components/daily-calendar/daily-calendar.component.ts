import {Component, OnInit} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';

@Component({
  selector: 'daily-calendar',
  templateUrl: './daily-calendar.component.html',
  styleUrls: ['./daily-calendar.component.scss']
})
export class DailyCalendarComponent implements OnInit {

  dateList: number[] = [];
  currentDate: number = new Date().getTime();
  config: DailyViewConfigModel;

  constructor(private _dailyViewService: DailyViewService) {
    this._dailyViewService.dailyViewConfig.subscribe(config => {
      this.config = config;
    });
    // temporary code
    this.getDateList();
    this.changeDate(this.currentDate);
  }

  ngOnInit() {
    let a = Number('6666');
    console.log(a);
  }

  getDateList() {
    const minDate = this.currentDate - 3 * 24 * 60 * 60 * 1000;
    let maxDate = this.currentDate + 3 * 24 * 60 * 60 * 1000;
    while (maxDate > minDate) {
      maxDate -= 24 * 60 * 60 * 1000;
      this.dateList.push(maxDate);
    }
  }

  changeDate(date) {
    this.config.date = date;
    this._dailyViewService.dailyViewConfig.next(this.config);
  }

  setToCurrent() {
    this.config.date = this.currentDate;
    this._dailyViewService.dailyViewConfig.next(this.config);
  }
}
