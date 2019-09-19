import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {merge, Observable, Subject, Subscription} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, toArray} from 'rxjs/operators';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFilterComponent implements OnInit {
  shiftBlockName: string;
  shiftOptions: Observable<any>;
  shiftChange: Subject<string[]>;

  unitBlockName: string;
  unitOptions: Observable<any>;
  unitChange: Subject<string[]>;

  dayBlockName: string;
  dayOptions: Observable<any>;
  dayChange: Subject<string[]>;

  staffBlockName: string;
  staffOptions: Observable<any>;
  staffChange: Subject<string[]>;

  employmentBlockName: string;
  employmentOptions: Observable<any>;
  employmentChange: Subject<string[]>;

  control: FormControl = new FormControl('');
  subscription: Subscription;
  filterOptions = false;
  first: string;

  constructor(
    private _dailyService: DailyViewService,
    private utils: UtilsService
  ) {
  }

  ngOnInit() {

    this.subscription = this.utils.getFilterConfiguration().subscribe(filterConfigs => {
      const that = this;
      filterConfigs.forEach(function (value) {
        switch (value['key']) {
          case 'shift_type':
            that.shiftOptions = that._dailyService.getShifts().pipe(
              flatMap(e => e),
              map(e => ({
                name: e.shiftTime,
                value: e.shiftTime
              })),
              toArray());
            that.shiftBlockName = value['name'];
            break;
          case 'unit_type':
            that.unitOptions = that._dailyService.getUnits().pipe(flatMap(e => e),
              map(e => ({
                name: e.value,
                value: e.value
              })),
              toArray());
            that.unitBlockName = value['name'];
            break;
          case 'shift_days':
            that.dayOptions = that._dailyService.getDays().pipe(
              flatMap(e => e),
              map(e => ({
                name: e.name,
                value: e.id
              })),
              toArray());
            that.dayBlockName = value['name'];
            break;
          case 'staff_type':
            that.staffOptions = that._dailyService.getStaffTypes().pipe(
              flatMap(e => e),
              map(e => ({
                name: e.staffTypeName,
                value: e.staffTypeId
              })),
              toArray());
            that.staffBlockName = value['name'];
            break;
          case 'employment_type':
            that.employmentOptions = that._dailyService.getEmploymentTypes().pipe(
              flatMap(e => e),
              map(e => ({
                name: e.employmentTypeName,
                value: e.employmentTypeId
              })),
              toArray());
            that.employmentBlockName = value['name'];
            break;
        }
      });

      if (filterConfigs.length > 0) {
        this.first = filterConfigs[0]['name'];
      }
    });
  }

  toggleFilterOptions() {
    this.filterOptions = !this.filterOptions;
  }
}
