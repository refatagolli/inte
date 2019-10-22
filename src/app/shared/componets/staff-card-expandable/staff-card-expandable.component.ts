import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StaffMember} from '../../../models/StaffMember';

@Component({
  selector: 'app-staff-card-expandable',
  templateUrl: './staff-card-expandable.component.html',
  styleUrls: ['./staff-card-expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCardExpandableComponent implements OnInit {

  @Input() control = false;
  @Input() staffMembers: StaffMember[];
  @Output() selectionChange: EventEmitter<StaffMember> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}
