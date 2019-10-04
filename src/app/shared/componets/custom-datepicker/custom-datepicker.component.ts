import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomDatepickerComponent implements OnInit {

  calendarDays = ['SU', 'M', 'T', 'W', 'TH', 'F', 'SA'];

  constructor() { }

  ngOnInit() {
  }

}
