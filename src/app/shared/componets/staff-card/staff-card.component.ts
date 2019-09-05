import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCardComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() initials: string;
  @Input() isPresent: boolean;
  @Input() hasAction: boolean;
  @Input() openShift: boolean;

  constructor() { }

  ngOnInit() {
  }

}
