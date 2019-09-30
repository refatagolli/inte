import {Component, Input, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';

@Component({
  selector: 'weekly-data-container',
  templateUrl: './weekly-data-container.component.html',
  styleUrls: ['./weekly-data-container.component.scss']
})
export class WeeklyDataContainerComponent implements OnInit {

  @Input() data: any;
  @Input() primaryField: any;
  @Input() days: number[];
  @Input() shiftDetails: ShiftDetails;

  expanded = true;

  constructor() {
  }

  ngOnInit() {
  }

  getShiftDetails(staffType): ShiftDetails {
    return {...this.shiftDetails, staffType};
  }

}
