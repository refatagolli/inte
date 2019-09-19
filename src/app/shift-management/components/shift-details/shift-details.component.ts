import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {StaffMember} from '../../../models/StaffMember';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrls: ['./shift-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftDetailsComponent implements OnInit {

  @Input() shiftDetails: ShiftDetails;
  @Input() staffMember: StaffMember;

  removingFromStaff = false;
  elements;

  constructor(private _dailytViewService: DailyViewService) {

    this.elements = this._dailytViewService.getReasons().pipe(
      flatMap(e => e),
      map((e: any) => ({
        value: e.value,
        name: e.value
      })),
      toArray()
    );
  }

  ngOnInit() {
  }

  removeFromShift() {
    alert('removed');
  }
}
