import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AllStaff} from '../models/AllStaff';
import {FuseSidebarService} from '@theme/components/sidebar/sidebar.service';
import {ShiftDetails} from '../models/ShiftDetails';
import {StaffMember} from '../models/StaffMember';

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {

  public staffChange: Subject<{}> = new Subject();
  private _sidebarName = 'staffManagement';

  constructor(
    private _http: HttpClient,
    private _sidebareService: FuseSidebarService
  ) { }

  getStaffMembers(): Observable<AllStaff[]> {
    return this._http.get<AllStaff[]>('assets/random-data/allStaff.json');
  }

  openAddStaffPanel() {
    const sidebar = this._sidebareService.getSidebar(this._sidebarName);

    if (!sidebar.opened) {
      sidebar.toggleOpen();
    }
    // this.shiftChange.next({shiftDetails});
  }

  closePanel() {
    this._sidebareService.getSidebar(this._sidebarName).toggleOpen();
    // this.shiftChange.next(null);
  }

}
