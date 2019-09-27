import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DailyViewConfigModel} from '../../../models/daily-view-config-model';
import {DailyViewService} from '../../../services/daily-view.service';
import {filter, flatMap, groupBy, map, mergeMap, switchMap, takeUntil, tap, toArray} from 'rxjs/operators';
import {from, Observable, of, Subject, zip} from 'rxjs';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {flatten} from '@angular/compiler';
import {StaffMember} from '../../../models/StaffMember';
import {MatSelect} from '@angular/material';

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

    const b = 24 * 60 * 60 * 1000;
    const a = new Date().getTime() - 3 * b;

    for (let i = 1; i <= 7; i++) {
      this.weekdays.push(new Date(a + i * b).getTime());
    }
    this.config.date = new Date().getTime();
    this._dailyViewService.dailyViewConfig.next(this.config);


    this._dailyViewService.dailyViewConfig.pipe(
      tap(e => this.config = e),
      takeUntil(this._unsubscribeAll),
      flatMap(config => this.getStaff(config))
    ).subscribe(e => {
      this.elements = e;
      this._cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  selectDate(date: any) {
    this.currentDate = date;
  }

  areDatesEquals(d1, d2) {
    return new Date(d1).getDate() === new Date(d2).getDate();
  }

  getShiftDetails(shiftHours: string, staffType: string, unit: string): ShiftDetails {
    return {shiftHours, unit, staffType, shiftDate: this.config.date};
  }

  getPresent(asmth) {
    return flatten(asmth[this.primaryField].map(a => Object.values(a.staff))).length;
  }

  setSelectOptions(e: any[]) {
    const acc = this.config.viewType === 'unit' ? 'value' : 'shiftTime';
    this.selectOptions = e.map(el => el[acc]);
    this.select.value = this.selectOptions[0];
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
        c[p[0]] = p[1];
        return c;
      }, {})),
    );
  }
}
