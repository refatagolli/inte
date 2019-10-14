import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class ShiftManagementComponent implements OnInit, OnDestroy {

  public TYPE_SHIFT_DETAILS = 'shiftDetails';
  public TYPE_FILL_SHIFT = 'fillShift';
  public TYPE_FILL_SHIFT_RESPONSES = 'fillShiftResponses';
  public TYPE_SHIFTS_TO_FILL = 'shiftsToFill';
  public TYPE_REQUESTS = 'requests';
  public TYPE_REQUEST_INTELYPRO = 'requestIntelypro';

  public shiftManagementState: { shiftDetails?: ShiftDetails; staffMember?: StaffMember, requests?: any, replacing?: StaffMember, viewType: string };
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(private _siftManagementService: ShiftManagementService) {
  }

  ngOnInit(): void {

    this._siftManagementService.shiftChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(e => this.shiftManagementState = e);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
  }
}
