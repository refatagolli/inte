import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {ShiftManagementService} from '../../shift-management.service';
import {StaffMember} from '../../../models/StaffMember';

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
  @Input() replacing: StaffMember;

  constructor(private _shiftManagementService: ShiftManagementService,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._cdr.detectChanges();
  }

  toggleSidebar() {
    this._shiftManagementService.closePanel();
  }

}
