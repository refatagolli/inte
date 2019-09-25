import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';

@Component({
  selector: 'shifts-to-fill',
  templateUrl: './shifts-to-fill.component.html',
  styleUrls: ['./shifts-to-fill.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShiftsToFillComponent implements OnInit {

  openedShifts: Observable<ShiftDetails[]>;

  constructor(private _dailyService: DailyViewService) {
  }

  ngOnInit() {
    this.openedShifts = this._dailyService.getShiftsToFill();
  }

}
