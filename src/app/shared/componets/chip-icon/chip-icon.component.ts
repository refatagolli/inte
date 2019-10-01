import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'app-chip-icon',
  templateUrl: './chip-icon.component.html',
  styleUrls: ['./chip-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipIconComponent implements OnInit {

  @Input() name: string;
  @Input() iconMN: string;

  constructor() {
  }

  ngOnInit() {
  }

  getContent() {
    return UtilsService.getInitialsFromName(this.name);
  }

}
