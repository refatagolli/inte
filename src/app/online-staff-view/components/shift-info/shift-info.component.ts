import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShiftDetails} from '../../../../../models/ShiftDetails';

@Component({
  selector: 'shift-info',
  templateUrl: './shift-info.component.html',
  styleUrls: ['./shift-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftInfoComponent implements OnInit {

  @Input() shiftDetails: ShiftDetails ;

  constructor() { }

  ngOnInit() {
  }

}
