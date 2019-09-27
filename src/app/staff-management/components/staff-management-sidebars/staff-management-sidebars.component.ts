import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {StaffMember} from '../../../models/StaffMember';
import {Subject} from 'rxjs';
import {AllStaff} from '../../../models/AllStaff';
import {takeUntil} from 'rxjs/operators';
import {ShiftManagementService} from '../../../shift-management/shift-management.service';
import {StaffManagementService} from '../../staff-management.service';
import {StaffType} from '../../../models/StaffType';
import {Days} from '../../../models/Days';
import {ShiftType} from '../../../models/ShiftType';

@Component({
  selector: 'app-staff-management-sidebars',
  templateUrl: './staff-management-sidebars.component.html',
  styleUrls: ['./staff-management-sidebars.component.scss']
})
export class StaffManagementSidebarsComponent implements OnInit, OnDestroy  {

  public ADD_STAFF = 'addStaff';

  public staffManagementState: { staffMember: AllStaff, viewType: string, shifts: ShiftType[], days: Days[] };
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _staffManagementService: StaffManagementService) { }

  ngOnInit() {
    this._staffManagementService.staffChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(e => this.staffManagementState = e);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }

}
