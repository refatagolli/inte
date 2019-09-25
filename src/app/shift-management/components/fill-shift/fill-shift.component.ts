import {Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {from, Subject} from 'rxjs';
import {delay, filter, flatMap, tap, toArray} from 'rxjs/operators';
import {StaffMember} from '../../../models/StaffMember';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-fill-shift-component',
  templateUrl: './fill-shift.component.html',
  styleUrls: ['./fill-shift.component.scss']
})
export class FillShiftComponent implements OnInit {

  @Input() shiftDetails: ShiftDetails;
  @Input() replacing: StaffMember;
  staff;
  staffList;
  filter = new Subject<any>();
  selectedStaff: StaffMember[] = [];
  message: FormControl = new FormControl('', Validators.required);
  filterOptions: any;

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
    this._s.getStaff().subscribe(e => {
      this.staffList = e;
      this.filter.next({});

      this.message.setValue(this.getStaffMessage(this.shiftDetails.shiftHours, new Date(this.shiftDetails.shiftDate).toDateString()));
    });

    this.staff = this.filter.pipe(
      tap(e => this.filterOptions = e),
      flatMap(e => from(this.staffList).pipe(
        filter((s: { staffType: string }) => s.staffType.toLocaleLowerCase() === this.shiftDetails.staffType.toLocaleLowerCase()),
        delay(100),
        filter(s => FillShiftComponent.checkQ(s, e.q) &&
          FillShiftComponent.checkUnit(s, e.unit) && FillShiftComponent.checkShift(s, e.shift)),
        toArray(),
      )),
    );
  }

  selectStaff(staff: StaffMember[]) {
    this.selectedStaff = staff;
  }

  getStaffMessage(shift, date: string) {
    return `Are you available to work the ${shift} Shift on ${date} ? Please respond http://`;
  }
}
