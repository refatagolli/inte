import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'online-staff-view-my-schedule',
  templateUrl: './online-staff-view-my-schedule.component.html',
  styleUrls: ['./online-staff-view-my-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnlineStaffViewMyScheduleComponent implements OnInit {

  @Input() shiftList: any[];
  @Input() dates: any[];

  constructor() {
  }

  ngOnInit() {
    console.log(this.shiftList, this.dates);
  }

  getShiftDetailsByDate(date: any) {
    return this.shiftList.filter(e => {
      const shiftDate = new Date(e.shiftDate);
      const d = new Date(date);
      return d.getDay() === shiftDate.getDay() && d.getMonth() === shiftDate.getMonth() && d.getFullYear() === shiftDate.getFullYear();
    })[0];
  }
}
