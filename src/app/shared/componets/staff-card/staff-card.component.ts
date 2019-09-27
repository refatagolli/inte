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
  @Input() showNotPresent = true;
  @Output() viewDetailsEvent: EventEmitter<StaffMember> = new EventEmitter();
  @Output() fillShiftEvent: EventEmitter<StaffMember> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('click')
  public onClick() {
    if (!this.openShift || this.staffMember.away) {
      this.viewDetailsEvent.emit();
    }
  }

  createShift() {
    this.fillShiftEvent.emit();
  }

  fillShift() {
    this.fillShiftEvent.emit(this.staffMember);
  }
}
