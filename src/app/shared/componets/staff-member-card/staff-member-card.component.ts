import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-staff-member-card',
  templateUrl: './staff-member-card.component.html',
  styleUrls: ['./staff-member-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffMemberCardComponent implements OnInit {

  @Input() title: string;
  @Input() total: number;
  @Input() present: number;
  @Input() expanded: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
