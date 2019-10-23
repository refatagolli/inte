import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  private _selectedItems: StaffMember[] = [];

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  selectItem(val: boolean, item: StaffMember) {
    if (val) {
      this._selectedItems.push(item);
    } else {
      this._selectedItems.splice(this.getIndexOf(item), 1);
    }
    this.selectionChange.emit(this._selectedItems);
  }

  getIndexOf(item: StaffMember) {
    let a = -1;
    this._selectedItems.forEach((e, i) => {
      if (e.fullName === item.fullName) {
        a = i;
      }
    });
    return a;
  }

  hardsetSelected(selected: StaffMember[]) {
    this._selectedItems = [...selected];
    this._cdr.markForCheck();
  }
}
