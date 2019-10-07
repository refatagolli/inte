import {Component, OnInit} from '@angular/core';
import {FuseConfigService} from '@theme/services/config.service';
import {DailyViewService} from '../services/daily-view.service';
import {filter, map, mapTo, tap} from 'rxjs/operators';

@Component({
  selector: 'online-staff-view',
  templateUrl: './online-staff-view.component.html',
  styleUrls: ['./online-staff-view.component.scss']
})
export class OnlineStaffViewComponent implements OnInit {

  myScheduleList: any[] = [];
  responses: any[] = [];
  openShifts: any[] = [];


  constructor(private _configService: FuseConfigService,
              private _dailyService: DailyViewService) {

    const a = this._configService.defaultConfig;
    a.layout.toolbar.hidden = true;
    this._configService.setConfig(a);
  }

  ngOnInit() {
    this._dailyService.getShiftsToFill().subscribe(e => this.openShifts = e);
    this._dailyService.getShiftsToFill().subscribe(e => this.responses = e);
    this._dailyService.getShiftsToFill().pipe(tap(console.log)).subscribe(e => this.myScheduleList = e);

  }

  filterUseless(dateList: any[]) {
    return dateList.filter(e => {
      const date = new Date(e);
      return date.getDate() !== 9 && date.getDate() !== 13;
    });
  }
}
