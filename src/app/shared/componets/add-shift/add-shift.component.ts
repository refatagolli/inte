import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddShiftComponent implements OnInit {

  @Output()
  addShift: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  addShiftOption() {
    this.addShift.next();
  }
}
