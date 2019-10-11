import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';

@Component({
  selector: 'shift-details-actions',
  templateUrl: './shift-details-actions.component.html',
  styleUrls: ['./shift-details-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftDetailsActionsComponent implements OnInit {

  @Input() shiftDetails: ShiftDetails;
  @Input() requestPending: boolean;
  @Input() showPending: boolean;
  @Input() isrq: boolean;

  @Output() acceptEvent: EventEmitter<ShiftDetails> = new EventEmitter();
  @Output() declineEvent: EventEmitter<ShiftDetails> = new EventEmitter();
  @Output() requestEvent: EventEmitter<ShiftDetails> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
