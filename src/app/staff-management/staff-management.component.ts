import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';
import {DailyViewService} from '../services/daily-view.service';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  filters: Observable<{}>;
  total = 100;
  filtered = 99;
  test: string;
  filterConfig: FilterConfiguration[] = [
    { key: 'shift_type', name: 'Shift Time' },
    { key: 'employment_type', name: 'Employment Type' },
    { key: 'staff_type', name: 'Staff Type' },
    { key: 'shift_days', name: 'Shift Days' }
  ];

  constructor(
    private utils: UtilsService,
    private dailyView: DailyViewService
              ) { }

  ngOnInit() {
    this.utils.setFilterConfiguration(this.filterConfig);
    this.utils.filterChanges.pipe().subscribe(value => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }
}
