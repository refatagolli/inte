import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-staff-grouping-card',
  templateUrl: './staff-grouping-card.component.html',
  styleUrls: ['./staff-grouping-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffGroupingCardComponent implements OnInit {

  @Input() title: string;
  @Input() errorMessage: string;
  @Input() total: string;
  @Input() present: string;
  @Input() expanded: boolean;

  constructor() { }

  ngOnInit() {
  }

}
