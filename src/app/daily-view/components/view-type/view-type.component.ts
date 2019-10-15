import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewTypeComponent implements OnInit, OnDestroy {
  dailyViewConfig: DailyViewConfigModel;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _dailyViewService: DailyViewService) {
  }

  ngOnInit() {

    this._dailyViewService.dailyViewConfig.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(e => this.dailyViewConfig = e);

  }

  changeViewType(viewType: 'shift' | 'unit') {
    if (viewType !== this.dailyViewConfig.viewType) {
      this.dailyViewConfig.viewType = viewType;
      this._dailyViewService.dailyViewConfig.next(this.dailyViewConfig);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }
}
