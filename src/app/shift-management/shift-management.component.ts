import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ShiftManagementService} from './shift-management.service';
import {takeUntil} from 'rxjs/operators';
import {ShiftDetails} from '../models/ShiftDetails';
import {StaffMember} from '../models/StaffMember';

@Component({
  selector: 'app-shift-management',
  templateUrl: './shift-management.component.html',
  styleUrls: ['./shift-management.component.scss']
})
export class ShiftManagementComponent implements OnInit {

  public shiftManagementState: { shiftDetails: ShiftDetails; staffMember?: StaffMember };
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _siftManagementService: ShiftManagementService) {
  }

  ngOnInit(): void {

    this._siftManagementService.shiftChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(e => this.shiftManagementState = e);
  }


}
