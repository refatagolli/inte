import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {of, Subject} from 'rxjs';
import {delay, filter, flatMap, takeUntil, tap, toArray} from 'rxjs/operators';
import {StaffMember} from '../../../models/StaffMember';
import {FormControl, Validators} from '@angular/forms';
import {ShiftManagementFilterComponent} from '../shift-management-filter/shift-management-filter.component';

@Component({
  selector: 'app-fill-shift-component',
  templateUrl: './fill-shift.component.html',
  styleUrls: ['./fill-shift.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillShiftComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() shiftDetails: ShiftDetails;
  @Input() replacing: StaffMember;
  @ViewChild(ShiftManagementFilterComponent) shiftManagementFilter: ShiftManagementFilterComponent;

  staff: StaffMember[] = [];
  selectedStaff: StaffMember[] = [];
  unselectedStaff: StaffMember[] = [];

  filter = new Subject<any>();
  filterOptions: any = {};

  search = new Subject<any>();
  searchCriteria = '';
  searching = false;

  showFilters = true;
  message: FormControl = new FormControl('', Validators.required);

  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _dailyService: DailyViewService,
              private _cdr: ChangeDetectorRef) {
  }

  get areAllChecked() {
    return this.selectedStaff.length > 0 && this.unselectedStaff.length === 0;
  }

  private static checkShift(s: StaffMember, shift: string[]) {
    if (!shift || shift.length < 1) {
      return true;
    }
    return shift.indexOf(s.shiftHours) > -1;
  }

  private static checkEmploymentType(s: StaffMember, employmentType: string[]) {
    if (!employmentType || employmentType.length < 1) {
      return true;
    }
    return employmentType.indexOf(s.employmentType) > -1;
  }

  private static checkStaffType(s: StaffMember, staffType: string) {
    return s.staffType.toLocaleLowerCase() === staffType.toLocaleLowerCase();
  }

  private static checkQ(s: StaffMember, q: string) {
    if (!q) {
      return false;
    }
    return s.fullName.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1;
  }

  ngOnInit() {

    this._subscribeToFilterChanges();
    this._subscribeToSearchChanges();

    this._dailyService.getStaff().subscribe(e => {
      this.staff = e;
      this.message.setValue(this.getStaffMessage(this.shiftDetails.shiftHours, new Date(this.shiftDetails.shiftDate).toDateString()));
      this.filter.next({
        shift: [this.shiftDetails.shiftHours],
      });
      this._cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

  selectStaff(staff: StaffMember) {
    this.selectedStaff.push(staff);
    this.unselectedStaff = this.staff.filter(e => this.selectedStaff.indexOf(e) < 0);
  }

  getStaffMessage(shift, date: string) {
    return `Are you available to work the ${shift} Shift on ${date} ? Please respond http://`;
  }

  removeFilterOpt(key: string, u) {
    this.filterOptions[key].splice(this.filterOptions[key].indexOf(u), 1);
    this.shiftManagementFilter.forceSetFilters(this.filterOptions, true);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  toggleAll(newValue) {
    this.selectedStaff = newValue ? [...this.selectedStaff, ...this.unselectedStaff] : [];
    this.unselectedStaff = !newValue ? [...this.selectedStaff, ...this.unselectedStaff] : [];
  }

  sortByField(field: string) {
    const a = this.unselectedStaff.sort((first, next) => this._sortCondition(first, next, field));
    this.unselectedStaff = [...a];
    this._cdr.detectChanges();
  }

  hideSuggestions() {
    this.searching = true;
    this.showFilters = false;
    if (!this.searchCriteria) {
      this.unselectedStaff = [];
    }
  }

  showSuggestions() {
    this.searching = false;
    if (!this.searchCriteria) {
      this.showFilters = true;
      this.filter.next(this.filterOptions);
    }
  }

  removeSelected(staff: StaffMember) {
    this.selectedStaff.splice(this.selectedStaff.indexOf(staff), 1);
    this.unselectedStaff.push(staff);
  }

  private _sortCondition(first: StaffMember, next: StaffMember, field: string) {
    let condition: number;
    switch (field) {
      case 'hours':
        condition = first.hoursThisWeek - next.hoursThisWeek;
        break;
      case 'firstName':
        const f = first.fullName.split(' ')[0];
        const n = next.fullName.split(' ')[0];
        condition = f > n ? 1 : f < n ? -1 : 0;
        break;
      case 'lastName':
        const fl = first.fullName.split(' ')[1];
        const nl = next.fullName.split(' ')[1];
        condition = fl > nl ? 1 : fl < nl ? -1 : 0;
        break;
      default:
        condition = 0;
    }
    return condition;
  }

  private _subscribeToFilterChanges() {
    this.filter.pipe(
      takeUntil(this._unsubscribeAll),
      filter(e => this.staff.length > 0),
      tap(e => this._setFilters(e)),
      flatMap(e => of(this.staff).pipe(
        flatMap(as => as),
        delay(150),
        filter(s => {
          return FillShiftComponent.checkStaffType(s, this.shiftDetails.staffType) &&
            FillShiftComponent.checkEmploymentType(s, this.filterOptions.employmentType) &&
            FillShiftComponent.checkShift(s, this.filterOptions.shift);
        }),
        toArray()))
    ).subscribe((e: StaffMember[]) => {
      this.unselectedStaff = e;
      this.shiftManagementFilter.forceSetFilters(this.filterOptions, false);
      this._cdr.markForCheck();
    });
  }

  private _setFilters(e: any) {
    this.filterOptions = {...this.filterOptions, ...e};
  }

  private _subscribeToSearchChanges() {
    this.search.pipe(
      takeUntil(this._unsubscribeAll),
      tap(e => this.searchCriteria = e),
      tap(e => console.log('searched...', e)),
      flatMap(e => of(this.staff).pipe(
        flatMap(as => as),
        delay(150),
        filter(s => {
          return FillShiftComponent.checkQ(s, this.searchCriteria);
        }),
        toArray()))
    ).subscribe(e => {
      this.unselectedStaff = e;
      this._cdr.markForCheck();
    });
  }
}
