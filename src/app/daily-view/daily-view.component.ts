import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';
import {from, Observable, of, Subject, zip} from 'rxjs';
import {DailyViewService} from '../services/daily-view.service';
import {filter, flatMap, groupBy, map, mergeMap, switchMap, takeUntil, tap, toArray} from 'rxjs/operators';
import {DailyViewConfigModel} from '../models/daily-view-config-model';
import {StaffMember} from '../models/StaffMember';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit, OnDestroy {

  filterConfig: FilterConfiguration[] = [
    {key: 'shift_type', name: 'Shift Options'},
    {key: 'unit_type', name: 'Unit Options'}
  ];

  primaryField: string;
  weekdays = [];
  selectOptions: string[] = [];
  elements: any[] = [];
  selectedValue: string;

  config: DailyViewConfigModel;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private topPosToStartShowing = 150;

  constructor(private utils: UtilsService,
              private _dailyViewService: DailyViewService,
              private _cdr: ChangeDetectorRef) {

    this._dailyViewService.dailyViewConfig.pipe(
      tap(e => this.config = e),
      takeUntil(this._unsubscribeAll),
      flatMap(config => this.getStaff(config))
    ).subscribe(e => {
      this.elements = e;
      this.setWeekDays();
      this._cdr.markForCheck();
    });
  }

  get showScrollToTop() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollPosition)
    return scrollPosition >= this.topPosToStartShowing;
  }

  private static _setStaffField(e) {
    e[0]['staff'] = {...e[1]};
    return {...e[0]};
  }

  ngOnInit() {
    this.utils.setFilterConfiguration(this.filterConfig);

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  @HostListener('scroll', ['$event'])
  sdfsdfsdf($event) {
    // const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    console.log(event);
  }


  setSelectOptions(e: any[]) {
    const acc = this.config.viewType === 'unit' ? 'value' : 'shiftTime';
    this.selectOptions = e.map(el => el[acc]);
    this.selectedValue = this.selectOptions[0];
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
      map(DailyViewComponent._setStaffField)
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
