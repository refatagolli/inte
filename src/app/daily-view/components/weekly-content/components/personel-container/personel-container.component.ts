import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';
import {ShiftManagementService} from '../../../../../shift-management/shift-management.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material';
import {WeeklyDatepickerComponent} from '../weekly-datepicker/weekly-datepicker.component';
import {DailyViewService} from '../../../../../services/daily-view.service';
import {DailyViewConfigModel} from '../../../../../models/daily-view-config-model';
import * as moment from 'moment';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'personel-container',
  templateUrl: './personel-container.component.html',
  styleUrls: ['./personel-container.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('void', style({
        height: '0px'
      })),
      state('*', style({
        height: '*'
      })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('300ms ease-in'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonelContainerComponent implements OnInit {
  @Input() expanded = true;
  @Input() title;
  @Input() staff;
  @Input() days;
  @Input() shiftDetails: ShiftDetails;

  config: DailyViewConfigModel;
  addingStaff = false;

  private _openShiftDates = [];
  constructor(private _shiftManagementService: ShiftManagementService,
              private  _dailyService: DailyViewService,
              private _cdr: ChangeDetectorRef,
              private _dialog: MatDialog) {
  }

  ngOnInit() {
    this._dailyService.dailyViewConfig.subscribe(e => {
      this.config = e;
    });
  }

  fillShift(replacing, shiftDate) {
    this._shiftManagementService.openFillShiftPanel({...this.shiftDetails, shiftDate}, replacing);
  }

  openShiftDetails(staffMember, shiftDate) {
    this._shiftManagementService.openShiftDetailsPanel({...this.shiftDetails, shiftDate}, staffMember);
  }

  addStaff(event: any) {
    console.log(event.y);
    this._dialog.open(WeeklyDatepickerComponent, {
      position: {
        top: (event.y - (event.y < 250 ? 0 : event.y > 600 ? 300 : 250)) + 'px',
        left: '434px'
      },
      data: {
        currentDate: moment(this.config.date.currentDate),
        minDate: this.config.date.from,
        maxDate: this.config.date.to
      },
      backdropClass: 'invisible-backdrop',
      panelClass: 'date-range-picker'
    }).afterClosed().pipe(filter(e => !!e)).subscribe(e => {
      this._openShiftDates.push(e);
      this._cdr.markForCheck();
    });
  }

  hasOpenShift(date: number) {
    return this._openShiftDates.indexOf(date) > -1;
  }

  openAddStaff(shiftDate: number) {
    this._shiftManagementService.openFillShiftPanel({...this.shiftDetails, shiftDate});
  }

  isAway(el, w) {
    return !!(w.state === -1 && (el.away || (el.fullName[0] - 12) > 20));
  }

  isPresent(el, w) {
    return !!(w.state === 1 && (!el.away || (el.fullName[0] - 12) > 20));
  }

  hasPresentOnLeft(el, w, i) {
    return this.isPresent(el, w) && !this.isAway(el, w) && (i > 0 && this.isPresent(el, this.days[i - 1]));
  }

  hasPresentOnRight(el, w, i) {
    return this.isPresent(el, w) && !this.isAway(el, w) && (i < this.days.length - 1 && this.isPresent(el, this.days[i + 1]));
  }

  isSunday(date) {
    return new Date(date).getDay() === 0;
  }

  isSundayOnRight(index: number) {
    return (index < this.days.length - 1 && (this.isSunday(this.days[index + 1].date)));
  }

  isSundayOnLeft(index: number) {
    return (index > 0 && (this.isSunday(this.days[index - 1].date)));
  }
}
