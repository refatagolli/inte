import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';
import {DailyViewService} from '../../../../../services/daily-view.service';
import {ShiftManagementService} from '../../../../../shift-management/shift-management.service';

@Component({
  selector: 'shifts-to-fill',
  templateUrl: './shifts-to-fill.component.html',
  styleUrls: ['./shifts-to-fill.component.scss'],
})
export class ShiftsToFillComponent implements OnInit {

  shiftsToFill: ShiftDetails[] = [];
  current = 1;

  constructor(private _dailyService: DailyViewService,
              private _shiftManagementService: ShiftManagementService,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._dailyService.getShiftsToFill().subscribe(e => {
      this.shiftsToFill = e;
      this._cdr.detectChanges();
    });
  }

  goBack() {
    this.current--;
    this._cdr.markForCheck();
  }

  goForward() {
    this.current++;
    this._cdr.markForCheck();
  }

  getMessage() {
    const c: ShiftDetails = this.shiftsToFill[this.current - 1];
    return c ? `
    You need to fill the <span class="bold-item">${c.shiftHours}</span>
    <span class="bold-item">${c.staffType} shift </span> for 
    <span class="bold-item">${c.shiftDate} shift </span> in 
    <span class="bold-item">${c.unit} </span> 
    ` : '';
  }

  requestStaff() {
    this._shiftManagementService.openFillShiftPanel(this.shiftsToFill[this.current - 1]);
  }

  openShiftsToFill() {
    this._shiftManagementService.openShiftsToFill();
  }
}
