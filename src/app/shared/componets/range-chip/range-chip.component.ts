import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'range-chip',
  templateUrl: './range-chip.component.html',
  styleUrls: ['./range-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeChipComponent implements OnInit {

  @Input() present: number;
  @Input() total: number;
  @Input() extraText: string;

  constructor() { }

  ngOnInit() {
  }

}
