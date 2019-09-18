import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {StaffMember} from '../../../models/StaffMember';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffCardComponent implements OnInit {

  @Input() staffMember: StaffMember;
  @Input() openShift = false;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('click')
  public onClick() {
    this.itemSelected.emit();
  }

  createShift() {
    this.itemSelected.emit();
  }
}
