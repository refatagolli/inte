import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, takeUntil, tap, toArray} from 'rxjs/operators';
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

  shiftsBlockName: string;
  shiftTypes: Observable<any>;

  unitBlockName: string;
  unitOptions: Observable<any>;

  dayBlockName: string;
  dayOptions: Observable<any>;

  staffBlockName: string;
  staffOptions: Observable<any>;

  employmentBlockName: string;
  employmentOptions: Observable<any>;

  subject: Subject<any> = new Subject();
  control: FormControl = new FormControl('');
  filterOptions = false;
  first: string;
  private _unsubscribeAll: Subject<any> = new Subject();
  private applyedFilters: any;

  constructor(
    private _dailyService: DailyViewService,
    private utils: UtilsService) {
  }

  ngOnInit() {

    this.utils.filterCardConfigChange
      .pipe()
      .subscribe(value => {
        this.filterOptions = value;
      });

    this.utils.filterChanges
      .pipe()
      .subscribe(value => {
        this.applyedFilters = value;
      });

    this.utils.getFilterConfiguration()
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(e => this.applyedFilters = {}))
      .subscribe(filterConfigs => {
        filterConfigs.forEach((value) => {
          switch (value['key']) {
            case 'shift':
              this.shiftTypes = this._dailyService.getShiftTypes().pipe(
                flatMap(e => e),
                map(e => ({
                  name: e.shiftTypeName,
                  value: e.shiftTypeId
                })),
                toArray());
              this.shiftsBlockName = value['name'];
              break;
            case 'shift_type':
              this.shiftOptions = this._dailyService.getShifts().pipe(
                flatMap(e => e),
                map(e => ({
                  name: e.shiftTime,
                  value: e.shiftTime
                })),
                toArray());
              this.shiftBlockName = value['name'];
              break;
            case 'unit_type':
              this.unitOptions = this._dailyService.getUnits().pipe(flatMap(e => e),
                map(e => ({
                  name: e.value,
                  value: e.value
                })),
                toArray());
              this.unitBlockName = value['name'];
              break;
            case 'shift_days':
              this.dayOptions = this._dailyService.getDays().pipe(
                flatMap(e => e),
                map(e => ({
                  name: e.name,
                  value: e.id
                })),
                toArray());
              this.dayBlockName = value['name'];
              break;
            case 'staff_type':
              this.staffOptions = this._dailyService.getStaffTypes().pipe(
                flatMap(e => e),
                map(e => ({
                  name: e.staffTypeName,
                  value: e.staffTypeId
                })),
                toArray());
              this.staffBlockName = value['name'];
              break;
            case 'employment_type':
              this.employmentOptions = this._dailyService.getEmploymentTypes().pipe(
                flatMap(e => e),
                map(e => ({
                  name: e.employmentTypeName,
                  value: e.employmentTypeId
                })),
                toArray());
              this.employmentBlockName = value['name'];
              break;
          }
        });

        if (filterConfigs.length > 0) {
          this.first = filterConfigs[0]['name'];
        }
      });

    this.subscribeToSubject();
  }

  toggleFilterOptions() {
    this.filterOptions = !this.filterOptions;
  }

  private subscribeToSubject(): void {
    this.subject
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(e => {
          this.applyedFilters[e[0]] = e[1];
          this.utils.filterChangeSubject.next(this.applyedFilters);
        });
  }
}
