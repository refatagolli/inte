import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {Observable} from 'rxjs';
import {MatCheckbox} from '@angular/material';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'request-intelypro',
  templateUrl: './request-intelypro.component.html',
  styleUrls: ['./request-intelypro.component.scss']
})
export class RequestIntelyproComponent implements OnInit {

  openedShifts: Observable<ShiftDetails[]>;
  selectedShifts: ShiftDetails[] = [];

  sel = [];

  constructor(private _dailyService: DailyViewService) {
  }

  ngOnInit() {
    this.openedShifts = this._dailyService.getShiftsToFill().pipe(map(e =>{
      this.sel = e.map(e => false);
      return e;
    } ));
  }

  shiftSelected(insert: boolean, shift: ShiftDetails, i) {
    if (insert) {
      this.selectedShifts.push(shift);
      this.sel[i] = true;
    } else {
      this.selectedShifts.splice(this.selectedShifts.indexOf(shift), 1);
      this.sel[i] = false;
    }
    console.log(this.sel);
  }

  sendRequest() {
    alert('Request sent');
  }

  toggleAll(newValue: boolean) {
    console.log(newValue);
    this.sel = this.sel.map(e => {
      e = true;
      console.log(e);
      return newValue;
    });
  }
}
