import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';
import {Subject} from 'rxjs';
import {DailyViewService} from '../services/daily-view.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit, OnDestroy {

  filterConfig: FilterConfiguration[] = [
    {key: 'shift_type', name: 'Shift Options'},
    {key: 'unit_type', name: 'Unit Options'}
  ];

  config;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private utils: UtilsService,
              private _dailyViewService: DailyViewService) {
  }

  ngOnInit() {
    this.utils.setFilterConfiguration(this.filterConfig);

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

}
