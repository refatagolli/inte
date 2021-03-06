import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';

@Component({
  selector: 'online-staff-view-responses',
  templateUrl: './online-staff-view-responses.component.html',
  styleUrls: ['./online-staff-view-responses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineStaffViewResponsesComponent implements OnInit {

  @Input() shiftList: ShiftDetails[];
  @Input() dates: string[];
  @Input() showPending: boolean;
  @Input() ispending: boolean;

  showNotification = false;
  shiftConfirmed;
  operationType;


  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  getShiftDetailsByDate(date: any) {
    return this.shiftList.filter(e => {
      const shiftDate = new Date(e.shiftDate);
      const d = new Date(date);
      return d.getDay() === shiftDate.getDay() && d.getMonth() === shiftDate.getMonth() && d.getFullYear() === shiftDate.getFullYear();
    })[0];
  }

  acceptRequest(shift: ShiftDetails) {
    this.showNotification = true;
    this.shiftConfirmed = shift;
    this.operationType = 'accepted';
    this._cdr.markForCheck();
    setTimeout(() => this.removeShift(shift), 1500);
  }

  declineRequest(shift: ShiftDetails) {
    this.showNotification = true;
    this.shiftConfirmed = shift;
    this.operationType = 'rejected';
    this._cdr.markForCheck();
    setTimeout(() => this.removeShift(shift), 1500);
  }

  requestShift(shift: ShiftDetails) {
    this.showNotification = true;
    this.shiftConfirmed = shift;
    this.operationType = 'requested';
    this._cdr.markForCheck();
    setTimeout(() =>  this.removeShift(shift), 1500);
  }

  removeShift(shift: ShiftDetails) {
    this.shiftList.splice(this.shiftList.indexOf(shift), 1);
    this.showNotification = false;
    this._cdr.detectChanges();
  }
}
