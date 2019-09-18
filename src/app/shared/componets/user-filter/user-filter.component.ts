import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {merge, Observable, Subject} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, toArray} from 'rxjs/operators';

@Component({
  selector: 'user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFilterComponent implements OnInit {
  filterOptions = false;

  control: FormControl = new FormControl('');
  unitOptions: Observable<any>;
  shiftOptions: Observable<any>;
  shiftChange: Subject<string[]>;
  unitChange: Subject<string[]>;

  constructor(private _dailyService: DailyViewService) {
  }

  ngOnInit() {
    this.shiftOptions = this._dailyService.getShifts().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.shiftTime,
        value: e.shiftTime
      })),
      toArray());
    this.unitOptions = this._dailyService.getUnits().pipe(flatMap(e => e),
      map(e => ({
        name: e.value,
        value: e.value
      })),
      toArray());

  }

  toggleFilterOptions() {
    this.filterOptions = !this.filterOptions;
  }
}
