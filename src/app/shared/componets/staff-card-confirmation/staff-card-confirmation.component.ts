import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserResponse} from '../../../models/UserResponse';

@Component({
  selector: 'app-staff-card-confirmation',
  templateUrl: './staff-card-confirmation.component.html',
  styleUrls: ['./staff-card-confirmation.component.scss']
})
export class StaffCardConfirmationComponent implements OnInit {

  @Output() selectionChange: EventEmitter<boolean> = new EventEmitter();
  @Input() response: UserResponse;


  constructor() {
  }

  ngOnInit() {
  }

}
