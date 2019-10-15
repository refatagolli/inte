import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {flatten} from '@angular/compiler';
import {ShiftDetails} from '../../../../../models/ShiftDetails';

@Component({
  selector: 'app-staff-grouping-card',
  templateUrl: './staff-grouping-card.component.html',
  styleUrls: ['./staff-grouping-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffGroupingCardComponent implements OnInit {

  @Input() element: any;
  @Input() primaryField: string;
  @Input() shiftDate: number;
  @Input() expanded = false;

  constructor() {
  }

  get ratio() {
    console.log(this.element[this.primaryField])
;    const el = flatten(this.element[this.primaryField].map(a => Object.values(a.staff)));
    return {
      total: el.length,
      present: el.filter((e: { away: boolean }) => !e.away).length
    };
  }

  get shiftDetails(): ShiftDetails {
    const fieldName = this.primaryField === 'unit' ? 'shiftHours' : 'unit';
    const sh = {
      shiftDate: this.shiftDate
    };
    sh[fieldName] = this.primaryField === 'unit' ? this.element.shiftTime : this.element.value;
    return sh;
  }

  ngOnInit() {
  }

}
