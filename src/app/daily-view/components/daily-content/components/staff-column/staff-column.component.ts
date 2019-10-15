import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-staff-column',
  templateUrl: './staff-column.component.html',
  styleUrls: ['./staff-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffColumnComponent implements OnInit {

  @Input() element: any;
  @Input() primaryField: string;
  @Input() shiftDetails: string;

  keepOrder = (a, b) => {
    return a;
  }
  constructor() {
  }

  get getShiftDetails() {
    const fieldName = this.primaryField === 'unit' ? 'unit' : 'shiftHours';
    this.shiftDetails[fieldName] = this.primaryField === 'unit' ? this.element.value : this.element.shiftTime;
    return this.shiftDetails;
  }

  ngOnInit() {
  }

  getRatioStaff(asmth) {
    return {
      total: asmth.length,
      present: asmth.filter(e => !e.away).length
    };
  }

}
