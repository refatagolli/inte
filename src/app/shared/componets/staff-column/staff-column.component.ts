import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-staff-column',
  templateUrl: './staff-column.component.html',
  styleUrls: ['./staff-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffColumnComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit() {
  }

}
