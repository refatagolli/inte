import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';
import {Subject} from 'rxjs';
import {DailyViewService} from '../services/daily-view.service';
import {takeUntil} from 'rxjs/operators';
import {DailyViewConfigModel} from '../models/daily-view-config-model';

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

  config: DailyViewConfigModel;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private topPosToStartShowing = 150;

  constructor(private utils: UtilsService,
              private _dailyViewService: DailyViewService) {

    this._dailyViewService.dailyViewConfig.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(e => this.config = e);
  }

  ngOnInit() {
    this.utils.setFilterConfiguration(this.filterConfig);

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  get showScrollToTop() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollPosition)
    return scrollPosition >= this.topPosToStartShowing;
  }

  @HostListener('window:scroll', [])
    sdfsdfsdf(){
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  console.log(scrollPosition);
  }
}
