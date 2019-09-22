import {Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-fill-shift-component',
  templateUrl: './fill-shift.component.html',
  styleUrls: ['./fill-shift.component.scss']
})
export class FillShiftComponent implements OnInit {

  @Input() shiftDetails: ShiftDetails;
  staff;
  staffList;
  filter = new Subject<any>();
  control = new FormControl('');

  constructor(private _s: DailyViewService) {
  }

  private static checkShift(s: any, shift: string[]) {
    if (!shift) {
      return true;
    }
    return shift.indexOf(s.shiftTime) > -1;
  }

  private static checkUnit(s: any, unit: string[]) {
    if (!unit) {
      return true;
    }
    return unit.indexOf(s.unit) > -1;
  }

  private static checkQ(s: any, q: string) {
    return s.fullName.indexOf(q) > -1;
  }

  ngOnInit() {
    this._s.getStaff().subscribe(e => this.staffList = e);

    this.staff = this.filter.pipe(
      map(e => this.staffList.filter(s => FillShiftComponent.checkQ(s, e.q) && FillShiftComponent.checkUnit(s, e.unit) && FillShiftComponent.checkShift(s, e.shift)))
    );
  }

  test(event) {
    console.log(event);
  }
}
