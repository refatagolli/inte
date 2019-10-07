import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'rangepicker-header',
  templateUrl: './rangepicker-header.component.html',
  styleUrls: ['./rangepicker-header.component.scss']
})
export class RangepickerHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() date: moment.Moment;
  @Output() monthChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
