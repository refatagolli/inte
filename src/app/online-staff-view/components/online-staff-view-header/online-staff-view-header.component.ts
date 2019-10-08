import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'online-staff-view-header',
  templateUrl: './online-staff-view-header.component.html',
  styleUrls: ['./online-staff-view-header.component.scss']
})
export class OnlineStaffViewHeaderComponent implements OnInit {

  @Input() scheduledShifts: number;
  @Input() responses: number;
  @Input() openShifts: number;
  selectedTab: 'scheduled' | 'responses' | 'openShifts' = 'responses';

  constructor() {
  }

  ngOnInit() {
  }

}
