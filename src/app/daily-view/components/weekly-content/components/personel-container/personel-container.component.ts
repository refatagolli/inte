import {Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';
import {ShiftManagementService} from '../../../../../shift-management/shift-management.service';

@Component({
  selector: 'personel-container',
  templateUrl: './personel-container.component.html',
  styleUrls: ['./personel-container.component.scss']
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
}
