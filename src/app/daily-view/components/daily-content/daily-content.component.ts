import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DailyViewService} from '../../../services/daily-view.service';
import {from, Observable, of, Subject, zip} from 'rxjs';
import {filter, flatMap, groupBy, map, mergeMap, switchMap, takeUntil, tap, toArray} from 'rxjs/operators';
import {StaffMember} from '../../../models/StaffMember';
import {ShiftManagementService} from '../../../shift-management/shift-management.service';
import {ShiftDeatils} from '../../../models/ShiftDeatils';

@Component({
  selector: 'daily-content',
  templateUrl: './daily-content.component.html',
  styleUrls: ['./daily-content.component.scss']
})
export class DailyContentComponent implements OnInit, OnDestroy {

  public control = new FormControl(false);
  public elements: Observable<any> = new Observable();
  private _unsubscribeAll: Subject<any> = new Subject();
  private primaryField: string;
  private secondaryField: string;

  constructor(private _dailyViewService: DailyViewService,
              private _shiftManagementService: ShiftManagementService) {

    this.elements = this._dailyViewService.dailyViewConfig.pipe(
      takeUntil(this._unsubscribeAll),
      flatMap(config => this.getStaff(config))
    );
  }

  private static _setStaffField(e) {
    // const a = {...e[0]};
    e[0]['staff'] = {...e[1]};
    return {...e[0]};
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

  openShiftDetails(staffMember: StaffMember) {
    const shiftDetails: ShiftDeatils = {
      staffType: staffMember.staffType,
      shiftHours: staffMember.shiftHours,
      shiftDate: new Date().getTime(),
      unit: staffMember.unit
    };
    this._shiftManagementService.openShiftDetailsPanel(shiftDetails, staffMember);
  }

  openFillShift() {
    const shiftDetails: ShiftDeatils = {
      staffType: 'test',
      shiftHours: 'test',
      shiftDate: new Date().getTime(),
      unit: 'test'
    };
    this._shiftManagementService.openFillShiftPanel(shiftDetails);
  }

  private getStaff(config): Observable<any> {
    const a = config.viewType === 'unit' ? this._dailyViewService.getUnits() : this._dailyViewService.getShifts();
    const b = config.viewType === 'unit' ? this._dailyViewService.getShifts() : this._dailyViewService.getUnits();
    this.primaryField = config.viewType === 'unit' ? 'shift' : 'unit';
    this.secondaryField = config.viewType !== 'unit' ? 'shift' : 'unit';

    return zip(a, b).pipe(
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
      map(DailyContentComponent._setStaffField),
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
