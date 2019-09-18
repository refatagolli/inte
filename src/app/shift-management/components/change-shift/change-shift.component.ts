import {Component, Input, OnInit} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, tap, toArray} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.scss']
})
export class ChangeShiftComponent implements OnInit {


  @Input() currentShift: string;
  elements: Observable<any>;

  constructor(private _dailyViewService: DailyViewService) {
  }

  ngOnInit() {

    this.elements = this._dailyViewService.getShifts().pipe(
      flatMap(e => e),
      tap(console.log),
      map((e: any) => ({
        name: e.shiftTime,
        value: e.shiftTime
      })),
      toArray(),
    );
  }
}
