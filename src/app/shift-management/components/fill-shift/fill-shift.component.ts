import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {from, of, Subject} from 'rxjs';
import {delay, filter, flatMap, map, take, tap, toArray} from 'rxjs/operators';
import {StaffMember} from '../../../models/StaffMember';
import {FormControl, Validators} from '@angular/forms';
import {ShiftManagementFilterComponent} from '../shift-management-filter/shift-management-filter.component';

@Component({
  selector: 'app-fill-shift-component',
  templateUrl: './fill-shift.component.html',
  styleUrls: ['./fill-shift.component.scss']
})
export class FillShiftComponent implements OnInit {

  @Input() shiftDetails: ShiftDetails;
  @Input() replacing: StaffMember;
  @ViewChild(ShiftManagementFilterComponent) private _smf: ShiftManagementFilterComponent;
  staff;
  staffList;
  filter = new Subject<any>();
  selectedStaff: StaffMember[] = [];
  message: FormControl = new FormControl('', Validators.required);
  filterOptions: any;
  total: number;

  constructor(private _s: DailyViewService) {
  }

  private static checkShift(s: any, shift: string[]) {
    if (!shift || shift.length < 1) {
      return true;
    }
    return shift.indexOf(s.shiftHours) > -1;
  }

  private static checkUnit(s: any, unit: string[]) {
    if (!unit || unit.length < 1) {
      return true;
    }
    return unit.indexOf(s.unit) > -1;
  }

  private static checkQ(s: any, q: string) {
    if (!q) {
      return true;
    }
    return s.fullName.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1;
  }

  ngOnInit() {
    this._s.getStaff().pipe(
      flatMap(e => e),
      filter((s: { staffType: string }) => s.staffType.toLocaleLowerCase() === this.shiftDetails.staffType.toLocaleLowerCase()),
      toArray()
    ).subscribe(e => {
      this.staffList = e;
      this.message.setValue(this.getStaffMessage(this.shiftDetails.shiftHours, new Date(this.shiftDetails.shiftDate).toDateString()));
      this.filter.next({});
    });

    this.staff = this.filter.pipe(
      tap(e => this.filterOptions = e),
      flatMap(e => of(this.staffList).pipe(
        flatMap(a => a),
        delay(150),
        filter(s => {
          return FillShiftComponent.checkQ(s, this.filterOptions.q) &&
            FillShiftComponent.checkUnit(s, this.filterOptions.unit) && FillShiftComponent.checkShift(s, this.filterOptions.shift);
        }),
        toArray())),
      tap(e => this.total = e.length)
    );
  }

  selectStaff(staff: StaffMember[]) {
    this.selectedStaff = staff;
  }

  getStaffMessage(shift, date: string) {
    return `Are you available to work the ${shift} Shift on ${date} ? Please respond http://`;
  }

  removeFilterOpt(key: string, u) {
    this.filterOptions[key].splice(this.filterOptions[key].indexOf(u), 1);
    this._smf.subject.next([key, this.filterOptions[key]]);
  }
}
