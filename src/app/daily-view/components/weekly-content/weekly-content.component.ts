import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {DailyViewService} from '../../../services/daily-view.service';
import {filter, flatMap, groupBy, map, mergeMap, switchMap, takeUntil, tap, toArray} from 'rxjs/operators';
import {from, Observable, of, Subject, zip} from 'rxjs';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {StaffMember} from '../../../models/StaffMember';
import {MatSelect} from '@angular/material';
import {PerfectScrollbarDirective} from '@theme/directives/perfect-scrollbar/perfect-scrollbar.directive';

@Component({
  selector: 'weekly-content',
  templateUrl: './weekly-content.component.html',
  styleUrls: ['./weekly-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyContentComponent implements OnInit, OnDestroy {
  @ViewChild(MatSelect) select: MatSelect;
  elements: any[] = [];
  weekdays = [];
  config: DailyViewConfigModel;
  primaryField: string;
  selectOptions: string[] = [];
  currentDate = new Date().getTime();
  @ViewChild(PerfectScrollbarDirective) private _container: PerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _dailyViewService: DailyViewService,
              private _cdr: ChangeDetectorRef) {
  }

  get currentElement() {
    return this.elements[this.selectOptions.indexOf(this.select.value)];
  }

  private static _setStaffField(e) {
    e[0]['staff'] = {...e[1]};
    return {...e[0]};
  }

  ngOnInit() {

    this._dailyViewService.dailyViewConfig.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(e => this.config = e);

    this._dailyViewService.dailyViewConfig.pipe(
      tap(e => this.config = e),
      takeUntil(this._unsubscribeAll),
      flatMap(config => this.getStaff(config))
    ).subscribe(e => {
      this.elements = e;
      this.setWeekDays();
      this._cdr.markForCheck();
    });
    // console.log(this._container);
  }

  setWeekDays() {
    this.weekdays = [];
    let n;
    let a = this.config.date.from;
    while (a < this.config.date.to) {
      n = Math.round(Math.random() * 10);
      this.weekdays.push({date: a, state: n < 2 ? 0 : n > 7 ? -1 : 1});
      a += 24 * 60 * 60 * 1000;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  selectDate(date: any) {
    this.currentDate = date;
  }

  getShiftDetails(element): ShiftDetails {
    let shiftHours = '';
    let unit = '';
    if (this.config.viewType === 'shift') {
      shiftHours = this.currentElement.shiftTime;
      unit = element.value;
    } else {
      shiftHours = element.shiftTime;
      unit = this.currentElement.value;
    }
    return {shiftHours, unit};
  }

  areDatesEquals(d1, d2) {
    return new Date(d1).getDate() === new Date(d2).getDate();
  }

  setSelectOptions(e: any[]) {
    const acc = this.config.viewType === 'unit' ? 'value' : 'shiftTime';
    this.selectOptions = e.map(el => el[acc]);
    this.select.value = this.selectOptions[0];
  }

  changeViewType(viewType: 'shift' | 'unit') {
    if (viewType !== this.config.viewType) {
      this.config.viewType = viewType;
      this._dailyViewService.dailyViewConfig.next(this.config);
    }
  }

  moveRight() {
    this._container.scrollToRight(0, 200);
  }

  moveLeft() {
    this._container.scrollToLeft(0, 200);
  }

  hasOverflow() {
    return this._container.ps.contentWidth > this._container.ps.containerWidth;

  }

  hasOverflowLeft() {
    return this.hasOverflow() && this._container.elementRef.nativeElement.scrollLeft > 0;
  }

  hasOverflowRight() {
    return this.hasOverflow() && this._container.elementRef.nativeElement.clientWidth +
      this._container.elementRef.nativeElement.scrollLeft !==
      this._container.elementRef.nativeElement.scrollWidth;
  }

  updateCRD() {
    this._cdr.markForCheck();
  }

  private getStaff(config): Observable<any> {
    const a = config.viewType === 'unit' ? this._dailyViewService.getUnits() : this._dailyViewService.getShifts();
    const b = config.viewType === 'unit' ? this._dailyViewService.getShifts() : this._dailyViewService.getUnits();
    this.primaryField = config.viewType === 'unit' ? 'shift' : 'unit';

    return zip(a.pipe(tap(e => this.setSelectOptions(e))), b).pipe(
      map(e => this._setSubGroup(e, this.primaryField)),
      mergeMap(e => zip(of(e), this._dailyViewService.getStaff())),
      flatMap(e => this._setStaff(e[0], e[1], config)),
      toArray(),
    );
  }

  private _setSubGroup(e, field) {
    return e[0].map(r => {
      r[field] = e[1].slice(0);
      return r;
    });
  }

  private _setStaff(setup, staff: StaffMember[], config) {
    return from(setup).pipe(
      switchMap(e =>
        this._zipByShiftAndUnit(e, staff, config.viewType).pipe(
          map(staffedUnits => {
            e[this.primaryField] = staffedUnits;
            return e;
          }))
      ),
    );
  }

  private _zipByShiftAndUnit(sub: any, staff: StaffMember[], viewType: string) {
    return from(sub[this.primaryField]).pipe(
      switchMap(e => this.zipStaff(viewType, e, {...sub}, staff)),
      toArray(),
    );
  }

  private zipStaff(viewType: string, e: any, sub: any, staff: StaffMember[]) {
    const shift = viewType === 'unit' ? e.shiftTime : sub.shiftTime;
    const unit = viewType === 'unit' ? sub.value : e.value;
    return zip(of(e), this._groupStaff(staff, unit, shift)).pipe(
      map(WeeklyContentComponent._setStaffField),
    );
  }

  private _groupStaff(staff: StaffMember[], unit: string, shift: string) {
    return from(staff).pipe(
      filter(s => s.unit === unit && s.shiftHours === shift),
      groupBy(e => e.staffType),
      mergeMap(e => zip(of(e.key), e.pipe(toArray()))),
      toArray(),
      map(e => e.reduce((c, p) => {
        c[p[0]] = p[1].sort((pr, cr) => {
          return cr.fullName < pr.fullName ? 1 : cr.fullName > pr.fullName ? -1 : 0;
        });
        return c;
      }, {})),
    );
  }
}
