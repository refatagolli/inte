import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FuseSidebarService} from '@theme/components/sidebar/sidebar.service';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {ShiftManagementService} from '../../shift-management.service';

@Component({
  selector: 'app-management-top-card',
  templateUrl: './management-top-card.component.html',
  styleUrls: ['./management-top-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ManagementTopCardComponent implements OnInit {

  @Input() title: string;
  @Input() shiftDetails: ShiftDetails;

  constructor(private _shiftManagementService: ShiftManagementService) {
  }

  ngOnInit() {
  }

  toggleSidebar() {
    this._shiftManagementService.closePanel();
  }

}
