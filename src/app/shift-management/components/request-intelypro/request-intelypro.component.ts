import {Component, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'request-intelypro',
  templateUrl: './request-intelypro.component.html',
  styleUrls: ['./request-intelypro.component.scss']
})
export class RequestIntelyproComponent implements OnInit {

  openedShifts: ShiftDetails[] = [];
  selectedShifts: ShiftDetails[] = [];

  sel = [];

  constructor(private _dailyService: DailyViewService) {
  }

  get areAllSelected() {
    return this.sel.filter(e => e).length === this.sel.length;
  }

  ngOnInit() {
    this._dailyService.getShiftsToFill().pipe(
      tap(e => this.sel = e.map(a => false))
    ).subscribe(e => this.openedShifts = e);
  }

  shiftSelected(insert: boolean, shift: ShiftDetails, i) {
    if (insert) {
      this.selectedShifts.push(shift);
      this.sel[i] = true;
    } else {
      this.selectedShifts.splice(this.selectedShifts.indexOf(shift), 1);
      this.sel[i] = false;
    }
  }

  sendRequest() {
    alert('Request sent');
  }

  toggleAll(newValue: boolean) {
    this.sel = this.sel.map(e => newValue);
    this.selectedShifts = newValue ? [...this.openedShifts] : [];
  }

}
