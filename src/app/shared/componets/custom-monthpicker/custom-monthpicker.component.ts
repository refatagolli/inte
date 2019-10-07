import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'custom-monthpicker',
  templateUrl: './custom-monthpicker.component.html',
  styleUrls: ['./custom-monthpicker.component.scss']
})
export class CustomMonthpickerComponent implements OnInit {

  months: string[];
  @Input() currentMonth: moment.Moment;
  @Output() monthChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.months = moment.months();
  }

  isMonthSelected(i: number) {
    return this.currentMonth.month() === i;
  }

}
