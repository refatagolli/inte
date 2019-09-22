import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';
import {DailyViewService} from '../services/daily-view.service';
import {StaffType} from '../models/StaffType';
import {ShiftType} from '../models/ShiftType';
import {EmploymentType} from '../models/EmploymentType';
import {Days} from '../models/Days';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit, OnDestroy {

  private filters: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  usedIn = 'staff-management';
  appliedFilters: any[] = [];
  staffTypes: StaffType[];
  shiftTypes: ShiftType[];
  employmentTypes: EmploymentType[];
  days: Days[];
  total = 100;
  filtered = 99;
  test: string;
  filterConfig: FilterConfiguration[] = [
    { key: 'shift', name: 'Shift Time' },
    { key: 'employment_type', name: 'Employment Type' },
    { key: 'staff_type', name: 'Staff Type' },
    { key: 'shift_days', name: 'Shift Days' }
  ];

  constructor(
    private utils: UtilsService,
    private dailyView: DailyViewService
              ) { }

  ngOnInit() {
    this.retrieveTypes();
    this.utils.setFilterConfiguration(this.filterConfig);
    this.utils.setFilterUsedComponent(this.usedIn);
    this.utils.filterChanges.pipe(
      tap(e => this.appliedFilters = [])
    ).subscribe(value => {
      this.filters = value;
      this.appliedFilters = [];
      if (value['shift_type']) {
        value['shift_type'].forEach((item) => {
          this.appliedFilters.push({
            'id' : item,
            'name' : this.shiftTypes.filter(function(each) { return each.shiftTypeId === item; })[0].shiftTypeName,
            'type' : 'shift_type'
          });
        });
      }

      if (value['day']) {
        value['day'].forEach((item) => {
          this.appliedFilters.push({
            'id' : item,
            'name' : this.days.filter(function(each) { return each.id === item; })[0].name,
            'type' : 'day'
          });
        });
      }

      if (value['staff']) {
        value['staff'].forEach((item) => {
          this.appliedFilters.push({
            'id' : item,
            'name' : this.staffTypes.filter(function(each) { return each.staffTypeId === item; })[0].staffTypeName,
            'type' : 'staff'
          });
        });
      }

      if (value['employmentType']) {
        value['employmentType'].forEach((item) => {
          this.appliedFilters.push({
            'id' : item,
            'name' : this.employmentTypes.filter(function(each) { return each.employmentTypeId === item; })[0].employmentTypeName,
            'type' : 'employmentType'
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  private retrieveTypes() {
    this.dailyView.getShiftTypes().pipe()
      .subscribe(shifts => {
        this.shiftTypes = shifts;
      });

    this.dailyView.getStaffTypes().pipe()
      .subscribe(staffType => {
        this.staffTypes = staffType;
      });

    this.dailyView.getEmploymentTypes().pipe()
      .subscribe(employmentTypes => {
        this.employmentTypes = employmentTypes;
      });

    this.dailyView.getDays().pipe()
      .subscribe(days => {
        this.days = days;
      });
  }

  removeFilter(item: any) {
    this.filters[item['type']].splice(this.filters[item['type']].findIndex(index => index === item['id']), 1);
    this.utils.filterChangeSubject.next(this.filters);
  }
}
