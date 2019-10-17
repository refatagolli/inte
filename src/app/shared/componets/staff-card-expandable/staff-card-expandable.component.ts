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
  @Input() selected: boolean[];
  @Input() selectedValues: StaffMember[] = [];
  @Output() selectionChange: EventEmitter<StaffMember[]> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toggleValue(checked: boolean, staffMember: StaffMember, index?: number) {
    if (checked) {
      this.selectedValues.push(staffMember);
    } else {
      this.selectedValues.splice(this.selectedValues.indexOf(staffMember), 1);
    }
    this.selectionChange.emit(this.selectedValues);
    this.selected[index] = !this.selected[index];
  }
}
