import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, tap, toArray} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.scss']
})
export class ChangeShiftComponent implements OnInit, AfterViewInit {


  @Input() currentShift: string;
  @Input() currentDate: number;
  elements: Observable<any>;
  changeShift = false;
  dateFormControl: FormControl = new FormControl();

  constructor(private _dailyViewService: DailyViewService) {
  }

  ngOnInit() {
    console.log(this.currentDate);
    this.elements = this._dailyViewService.getShifts().pipe(
      flatMap(e => e),
      map((e: any) => ({
        name: e.shiftTime,
        value: e.shiftTime
      })),
      toArray(),
    );

    this.dateFormControl.valueChanges.subscribe(e => console.log());
  }

  toggleChangeShift() {
    this.changeShift = !this.changeShift;
  }

  ngAfterViewInit(): void {
    this.dateFormControl.patchValue(formatDate(this.currentDate, 'mm/dd/yyyy', 'en'), {emitEvent: true});
  }
}
