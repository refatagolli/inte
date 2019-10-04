import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';
import {ShiftManagementService} from '../../../../../shift-management/shift-management.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  constructor(private _shiftManagementService: ShiftManagementService) {
  }

  ngOnInit() {
  }

  fillShift(replacing, shiftDate) {
    this._shiftManagementService.openFillShiftPanel({...this.shiftDetails, shiftDate}, replacing);
  }

  openShiftDetails(staffMember, shiftDate) {
    this._shiftManagementService.openShiftDetailsPanel({...this.shiftDetails, shiftDate}, staffMember);
  }

  addStaff() {
    // console.log()
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
