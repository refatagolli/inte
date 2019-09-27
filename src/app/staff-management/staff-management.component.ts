import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {Subject, Observable} from 'rxjs';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';
import {DailyViewService} from '../services/daily-view.service';
import {StaffType} from '../models/StaffType';
import {ShiftType} from '../models/ShiftType';
import {EmploymentType} from '../models/EmploymentType';
import {Days} from '../models/Days';
import {flatMap, takeWhile, tap} from 'rxjs/operators';
import {AllStaff} from '../models/AllStaff';
import {StaffManagementService} from './staff-management.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StaffManagementComponent implements OnInit, OnDestroy {

  private filters: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  usedIn = 'staff-management';
  searched = '';
  dataSource: MatTableDataSource<AllStaff>;
  allRecords: AllStaff[] = [];
  appliedFilters: any[] = [];
  staffTypes: StaffType[] = [];
  shiftTypes: ShiftType[] = [];
  employmentTypes: EmploymentType[] = [];
  displayedColumns: string[] = ['lastName', 'employmentType.employmentTypeName', 'staffType.staffTypeName', 'shifts', 'phone', 'view'];
  displayedColumns2: string[] = ['lastName'];
  days: Days[] = [];
  total = 0;
  filtered = 0;
  test: string;
  panelOpenState: false;
  filterConfig: FilterConfiguration[] = [
    { key: 'shift', name: 'Shift Time' },
    { key: 'employment_type', name: 'Employment Type' },
    { key: 'staff_type', name: 'Staff Type' },
    { key: 'shift_days', name: 'Shift Days' }
  ];

  expandedElement: any;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  constructor(
    private utils: UtilsService,
    private dailyView: DailyViewService,
    private staffService: StaffManagementService
              ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadData();
    this.utils.setFilterConfiguration(this.filterConfig);
    this.utils.setFilterUsedComponent(this.usedIn);
    this.staffService.updateStaffTable.pipe().subscribe(item => {
      this.retrieveStaffMembers();
    });

    this.utils.searchChanges.pipe().subscribe(val => {
      this.searched = val;
      const filterJson = {
        'search' : val,
        'appliedFilters' : this.filters
      };

      this.dataSource.filter = JSON.stringify(filterJson);
      this.filtered = this.dataSource.filteredData.length;
    });
    this.utils.filterChanges.pipe(tap(e => this.appliedFilters = [])).subscribe(value => {
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

      const filterJson = {
        'search' : this.searched,
        'appliedFilters' : this.filters
      };

      this.dataSource.filter = JSON.stringify(filterJson);
      this.filtered = this.dataSource.filteredData.length;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  private loadData() {

    this.dailyView.getShiftTypes().pipe(
      tap(e => this.shiftTypes = e),
      flatMap(e1 => this.dailyView.getStaffTypes().pipe(
        tap(e => this.staffTypes = e),
        flatMap( e2 => this.dailyView.getEmploymentTypes().pipe(
          tap(e => this.employmentTypes = e),
          flatMap( e3 => this.dailyView.getDays().pipe(
            tap(e => this.days = e)
          ))
        ))
      ))
    ).subscribe(dt => {
      this.retrieveStaffMembers();
    });
  }

  private retrieveStaffMembers () {
    this.staffService.getStaffMembers().pipe().subscribe(data => {
      this.total = data.length;
      this.filtered = data.length;
      this.allRecords = data;
      this.dataSource = new MatTableDataSource<AllStaff>(data);
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true;
      this.dataSource.filterPredicate = this.tableFilter();

      data.forEach( staff => {
        staff.shiftDaysString = '';
        this.shiftTypes.forEach(item => {
          let existsShift = false;

          staff.shiftDays.forEach(eachShift => {
            if (eachShift.shiftType.shiftTypeId === item.shiftTypeId) {
              staff.shiftDaysString += eachShift.day.name.substring(0, 3) + ', ';
              existsShift = true;
            }
          });

          if (existsShift) {
            staff.shiftDaysString = staff.shiftDaysString.substring(0, staff.shiftDaysString.length - 2);
            staff.shiftDaysString += ': ' + item.shiftTypeName + '<br />';
          }
        });

        staff.shiftDaysString = staff.shiftDaysString.substring(0, staff.shiftDaysString.length - 6);
      });
    });
  }

  removeFilter(item: any) {
    this.filters[item['type']].splice(this.filters[item['type']].findIndex(index => index === item['id']), 1);
    this.utils.filterChangeSubject.next(this.filters);
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function(data, filter): boolean {
      const parsedFilter = JSON.parse(filter);
      let shift_days = false;
      let allSelectedFilters = false;
      let daysNotChosen = false;

      if (parsedFilter.appliedFilters) {
        if (
          !parsedFilter.appliedFilters.day ||
          (parsedFilter.appliedFilters.day && parsedFilter.appliedFilters.day.length === 0)
        ) {
          daysNotChosen = true;
        }

        if (
          !parsedFilter.appliedFilters.shift_type ||
          (parsedFilter.appliedFilters.shift_type && parsedFilter.appliedFilters.shift_type.length === 0)
        ) {
          if (daysNotChosen) {
            shift_days = true;
          } else {
            data.shiftDays.forEach(item => {
              if (parsedFilter.appliedFilters.day.indexOf(item.day.id) !== -1) {
                shift_days = true;
              }
            });
          }
        } else {
          data.shiftDays.forEach(item => {
            if (parsedFilter.appliedFilters.shift_type.indexOf(item.shiftType.shiftTypeId) !== -1) {
              if (daysNotChosen) {
                shift_days = true;
              } else if (parsedFilter.appliedFilters.day.indexOf(item.day.id) !== -1) {
                shift_days = true;
              }
            }
          });
        }

        if ((
            !parsedFilter.appliedFilters.staff ||
            (parsedFilter.appliedFilters.staff && parsedFilter.appliedFilters.staff.length === 0) ||
            (parsedFilter.appliedFilters.staff && (parsedFilter.appliedFilters.staff.indexOf(data.staffType.staffTypeId) !== -1))
          )
          &&
          (
            !parsedFilter.appliedFilters.employmentType ||
            (parsedFilter.appliedFilters.employmentType && parsedFilter.appliedFilters.employmentType.length === 0) ||
            (parsedFilter.appliedFilters.employmentType &&
              (parsedFilter.appliedFilters.employmentType.indexOf(data.employmentType.employmentTypeId) !== -1))
          )
          && shift_days) {
          allSelectedFilters = true;
        }
      } else {
        allSelectedFilters = true;
      }

      return allSelectedFilters && (
      (data.firstName.toLowerCase() + ' ' + data.lastName.toLowerCase()).indexOf(parsedFilter.search.toLowerCase()) !== -1
        || (data.phone.toLowerCase().indexOf(parsedFilter.search.toLowerCase()) !== -1));
    };

    return filterFunction;
  }

  clearSearch() {
    this.filters = {};
    this.utils.searchChanged.next('');
    this.utils.filterChangeSubject.next(this.filters);
  }

  addNewStaffPanel() {
    this.staffService.openAddStaffPanel(this.shiftTypes, this.days);
  }

  editStaff(staffMember: AllStaff) {
    this.staffService.openEditStaffPanel(this.shiftTypes, this.days, staffMember);
  }

  check (e) {
    console.log(e);
  }
}
