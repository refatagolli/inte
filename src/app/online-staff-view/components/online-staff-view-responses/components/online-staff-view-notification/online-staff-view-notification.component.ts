import {Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';

@Component({
  selector: 'online-staff-view-notification',
  templateUrl: './online-staff-view-notification.component.html',
  styleUrls: ['./online-staff-view-notification.component.scss']
})
export class OnlineStaffViewNotificationComponent implements OnInit {

  @Input() shift: ShiftDetails;
  @Input() operationIsAccept: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
