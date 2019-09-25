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
  @Output() selectionChange: EventEmitter<StaffMember[]> = new EventEmitter();
  private _selectedValues: StaffMember[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  toggleValue(checked: boolean, staffMember: StaffMember) {
    if (checked) {
      this._selectedValues.push(staffMember);
    } else {
      this._selectedValues.splice(this._selectedValues.indexOf(staffMember), 1);
    }
    this.selectionChange.emit(this._selectedValues);
  }
}
