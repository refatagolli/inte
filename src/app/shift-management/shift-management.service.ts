import {Injectable} from '@angular/core';
import {FuseSidebarService} from '@theme/components/sidebar/sidebar.service';
import {ShiftDetails} from '../models/ShiftDetails';
import {Subject} from 'rxjs';
import {StaffMember} from '../models/StaffMember';
import {FuseSidebarComponent} from '@theme/components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ShiftManagementService {
  public static TYPE_SHIFT_DETAILS = 'shiftDetails';
  public static TYPE_FILL_SHIFT = 'fillShift';
  public static TYPE_SHIFTS_TO_FILL = 'shiftsToFill';
  public static TYPE_REQUESTS = 'requests';
  public static TYPE_REQUEST_INTELYPRO = 'requestIntelypro';

  public shiftChange: Subject<{ shiftDetails?: ShiftDetails, staffMember?: StaffMember, replacing?: StaffMember, viewType: string }> = new Subject();
  private _sidebarName = 'shiftManagement';
  private _sidebar: FuseSidebarComponent;

  constructor(private _sidebareService: FuseSidebarService) {
  }

  openShiftDetailsPanel(shiftDetails: ShiftDetails, staffMember: StaffMember) {
    this._openIfClosed();
    this.shiftChange.next({shiftDetails, staffMember, viewType: ShiftManagementService.TYPE_SHIFT_DETAILS});
  }

  openFillShiftPanel(shiftDetails: ShiftDetails, replacing?: StaffMember) {
    this._openIfClosed();
    this.shiftChange.next({shiftDetails, replacing, viewType: ShiftManagementService.TYPE_FILL_SHIFT});
  }

  openRequests() {
    this._openIfClosed();
    this.shiftChange.next({viewType: ShiftManagementService.TYPE_REQUESTS});
  }

  openRequestIntelyPro() {
    this._openIfClosed();
    this.shiftChange.next({viewType: ShiftManagementService.TYPE_REQUEST_INTELYPRO});
  }

  openShiftsToFill() {
    this._openIfClosed();
    this.shiftChange.next({viewType: ShiftManagementService.TYPE_SHIFTS_TO_FILL});
  }

  closePanel() {
    if (this._sidebar.opened) {
      this._sidebareService.getSidebar(this._sidebarName).toggleOpen();
    }
    this.shiftChange.next(null);
  }

  private _openIfClosed() {
    if (!this._sidebar) {
      this._sidebar = this._sidebareService.getSidebar(this._sidebarName);
      this._sidebar.openedChanged.subscribe(e => {
        if (!e) {
          this.closePanel();
        }
      });
    }
    if (!this._sidebar.opened) {
      this._sidebar.toggleOpen();
    }
  }
}
