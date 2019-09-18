import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {StaffMember} from '../../../models/StaffMember';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-staff-card-expandable',
  templateUrl: './staff-card-expandable.component.html',
  styleUrls: ['./staff-card-expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCardExpandableComponent implements OnInit {

  @Input() staffMember: StaffMember;
  @Input() control: FormControl;

  constructor() {
  }

  ngOnInit() {
  }
}
