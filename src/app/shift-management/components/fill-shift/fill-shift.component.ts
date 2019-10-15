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
  staffList: StaffMember[] = [];
  selectedStaff: StaffMember[] = [];
  sel = [];

  filter = new Subject<any>();
  filterOptions: any = {};


  message: FormControl = new FormControl('', Validators.required);

  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _dailyService: DailyViewService,
              private _cdr: ChangeDetectorRef) {
  }

  get areAllChecked() {
    return this.sel.filter(e => e).length === this.sel.length;
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

  private static checkQ(s: StaffMember, q: string) {
    if (!q) {
      return true;
    }
    return s.fullName.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1;
  }

  ngOnInit() {

    this._subscribeToFilterChanges();

    this._dailyService.getStaff().pipe(
      flatMap(e => e),
      filter(s =>
        s.staffType.toLocaleLowerCase() === this.shiftDetails.staffType.toLocaleLowerCase()),
      toArray()
    ).subscribe(e => {
      this.staffList = e;
      this.message.setValue(this.getStaffMessage(this.shiftDetails.shiftHours, new Date(this.shiftDetails.shiftDate).toDateString()));
      this.filter.next({shift: [this.shiftDetails.shiftHours]});
      this._cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

  selectStaff(staff: StaffMember[]) {
    this.selectedStaff = staff;
  }

  getStaffMessage(shift, date: string) {
    return `Are you available to work the ${shift} Shift on ${date} ? Please respond http://`;
  }

  removeFilterOpt(key: string, u) {
    this.filterOptions[key].splice(this.filterOptions[key].indexOf(u), 1);
    this.filter.next(this.filterOptions);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  toggleAll(newValue) {
    this.sel = this.sel.map(e => newValue);
    this.selectedStaff = newValue ? [...this.staff] : [];
  }

  sortByField(field: string) {
    const a = this.staff.sort((first, next) => this._sortCondition(first, next, field));
    this.staff = [...a];
    this._cdr.detectChanges();
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
      tap(console.log),
      filter(e => this.staffList.length > 0),
      takeUntil(this._unsubscribeAll),
      tap(e => this._setFilters(e)),
      flatMap(e => of(this.staffList).pipe(
        flatMap(as => as),
        delay(150),
        filter(s => {
          return FillShiftComponent.checkQ(s, this.filterOptions.q) &&
            FillShiftComponent.checkEmploymentType(s, this.filterOptions.employmentType) &&
            FillShiftComponent.checkShift(s, this.filterOptions.shift);
        }),
        toArray()))
    ).subscribe((e: StaffMember[]) => {
      this.staff = e;
      this.sel = e.map(a => false);
      this.selectedStaff = [];

      this._cdr.markForCheck();
    });
  }

  private _setFilters(e: any) {
    this.filterOptions = {...this.filterOptions , ...e};
  }
}
