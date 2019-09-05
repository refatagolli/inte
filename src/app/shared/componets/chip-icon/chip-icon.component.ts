import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chip-icon',
  templateUrl: './chip-icon.component.html',
  styleUrls: ['./chip-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
