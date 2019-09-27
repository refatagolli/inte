import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StaffMember} from '../../../models/StaffMember';

@Component({
  selector: 'staff-card-radio',
  templateUrl: './staff-card-radio.component.html',
  styleUrls: ['./staff-card-radio.component.scss']
})
export class StaffCardRadioComponent implements OnInit {

  @Input() selectable = false;
  @Input() checked = false;
  @Input() staffMember: StaffMember;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
