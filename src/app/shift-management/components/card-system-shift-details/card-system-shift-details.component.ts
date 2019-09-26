import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';

@Component({
  selector: 'card-system-shift-details',
  templateUrl: './card-system-shift-details.component.html',
  styleUrls: ['./card-system-shift-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSystemShiftDetailsComponent implements OnInit {
  @Output() selectionChange: EventEmitter<boolean> = new EventEmitter();
  @Input() shiftDetails: ShiftDetails;
  @Input() selectable = false;
  @Input() selected = false;

  constructor() {
  }

  ngOnInit() {
  }

}
