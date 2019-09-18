import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StaffMember} from '../../../models/StaffMember';

@Component({
  selector: 'app-staff-card-checkbox',
  templateUrl: './staff-card-checkbox.component.html',
  styleUrls: ['./staff-card-checkbox.component.scss']
})
export class StaffCardCheckboxComponent implements OnInit {

  @Input() control: FormControl;
  @Input() staffMember: StaffMember;

  constructor() { }

  ngOnInit() {
  }

}
