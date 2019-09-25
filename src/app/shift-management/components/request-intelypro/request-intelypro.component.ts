import {Component, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'request-intelypro',
  templateUrl: './request-intelypro.component.html',
  styleUrls: ['./request-intelypro.component.scss']
})
export class RequestIntelyproComponent implements OnInit {

  openedShifts: Observable<ShiftDetails[]>;
  selectedShifts: ShiftDetails[] = [];

  constructor(private _dailyService: DailyViewService) {
  }

  ngOnInit() {
    this.openedShifts = this._dailyService.getShiftsToFill();
  }

  shiftSelected(insert: boolean, shift: ShiftDetails) {
    if (insert) {
      this.selectedShifts.push(shift);
    } else {
      this.selectedShifts.splice(this.selectedShifts.indexOf(shift), 1);
    }
  }

  sendRequest() {
    alert('Request sent')
  }
}
