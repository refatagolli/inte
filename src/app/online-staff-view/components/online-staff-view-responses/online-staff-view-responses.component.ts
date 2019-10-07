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

  showNotification = false;
  shiftConfirmed;
  operationIsAccept;


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
    this.operationIsAccept = true;
    // this.removeShift(shift);
    this._cdr.detectChanges();
    setTimeout(() => this.showNotification = false, 2000);
  }

  declineRequest(shift: ShiftDetails) {

    this.showNotification = true;
    this.shiftConfirmed = shift;
    this.operationIsAccept = false;
    // this.removeShift(shift);
    this._cdr.detectChanges();
    setTimeout(() => this.showNotification = false, 2000);
  }

  removeShift(shift: ShiftDetails) {
    this.shiftList.splice(this.shiftList.indexOf(shift), 1);
    this._cdr.detectChanges();
  }
}
