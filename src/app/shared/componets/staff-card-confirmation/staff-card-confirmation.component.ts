import {Component, Input, OnInit} from '@angular/core';
import {StaffMember} from '../../../models/StaffMember';

@Component({
  selector: 'app-staff-card-confirmation',
  templateUrl: './staff-card-confirmation.component.html',
  styleUrls: ['./staff-card-confirmation.component.scss']
})
export class StaffCardConfirmationComponent implements OnInit {

  @Input() staffMember: StaffMember;
  @Input() response: 'pending' | 'reject' | 'confirm';


  constructor() {
  }

  ngOnInit() {
  }

}
