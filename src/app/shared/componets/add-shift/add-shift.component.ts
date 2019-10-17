import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddShiftComponent implements OnInit {

  @Output() addShift: EventEmitter<any> = new EventEmitter();
  @Input() clickable: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  addShiftOption(event: any) {
    this.addShift.next(event);
  }
}
