import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {ShiftManagementService} from '../../shift-management.service';

@Component({
  selector: 'shifts-to-fill',
  templateUrl: './shifts-to-fill.component.html',
  styleUrls: ['./shifts-to-fill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShiftsToFillComponent implements OnInit {

  openedShifts: ShiftDetails[] = [];

  constructor(private _dailyService: DailyViewService,
              private _sdf: ShiftManagementService) {
  }

  ngOnInit() {
    this._dailyService.getShiftsToFill().subscribe(e => {
      this.openedShifts = e;
    });
  }

  requestStaff(shift: ShiftDetails) {
    this._sdf.openFillShiftPanel(shift);
  }

}
