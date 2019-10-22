import {Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {StaffMember} from '../../../models/StaffMember';
import {filter, flatMap, take, toArray} from 'rxjs/operators';
import {DailyViewService} from '../../../services/daily-view.service';

@Component({
  selector: 'fill-shift-responses',
  templateUrl: './fill-shift-responses.component.html',
  styleUrls: ['./fill-shift-responses.component.scss']
})
export class FillShiftResponsesComponent implements OnInit {

  @Input() shiftDetails: ShiftDetails;
  @Input() requests: any;

  staff: StaffMember[] = [];
  staffList: StaffMember[] = [];
  selectedStaff: StaffMember[] = [];
  unselectedStaff: StaffMember[] = [];

  constructor(private _dailyService: DailyViewService) {
  }

  get areAllChecked() {
    return this.selectedStaff.length > 0 && this.unselectedStaff.length > 0;
  }

  ngOnInit() {

    this._dailyService.getStaff().pipe(
      flatMap(e => e),
      filter(s =>
        s.staffType.toLocaleLowerCase() === this.shiftDetails.staffType.toLocaleLowerCase()),
      take(5),
      toArray()
    ).subscribe(e => {
      this.staffList = e;
      this.staff = e;
    });
  }

  selectStaff(staff: StaffMember) {
    this.selectedStaff.push(staff);
  }

  toggleAll(newValue) {
    this.selectedStaff = newValue ? [...this.staff] : [];
  }

}
