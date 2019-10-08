import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {ShiftManagementService} from '../../shift-management.service';
import {StaffMember} from '../../../models/StaffMember';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-management-top-card',
  templateUrl: './management-top-card.component.html',
  styleUrls: ['./management-top-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('expandCollapse', [
      state('void', style({
        height: '0px'
      })),
      state('*', style({
        height: '*'
      })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('100ms ease-in'))
    ])
  ]
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
