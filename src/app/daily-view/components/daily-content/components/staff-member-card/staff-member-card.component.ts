import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {StaffMember} from '../../../../../models/StaffMember';
import {ShiftDetails} from '../../../../../models/ShiftDetails';
import {ShiftManagementService} from '../../../../../shift-management/shift-management.service';

@Component({
  selector: 'app-staff-member-card',
  templateUrl: './staff-member-card.component.html',
  styleUrls: ['./staff-member-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffMemberCardComponent implements OnInit {

  @Input() title: string;
  @Input() staffList: StaffMember[];
  @Input() expanded: boolean;
  @Input() shiftDetails: ShiftDetails;
  @Input() ratio: {
    total: number;
    present: number;
  };

  addStaff: boolean;

  keepOrder = (a, b) => {
    return a;
  }

  constructor(private _shiftManagementService: ShiftManagementService) {
  }

  get getShiftDetails() {
    this.shiftDetails['staffType'] = this.title;
    return this.shiftDetails;
  }

  ngOnInit() {
  }

  openShiftDetails(staffMember: StaffMember) {
    this._shiftManagementService.openShiftDetailsPanel(this.getShiftDetails, staffMember);
  }

  openFillShift(replacing?: StaffMember) {
    this._shiftManagementService.openFillShiftPanel(this.getShiftDetails, replacing);
  }

}
