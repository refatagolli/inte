import { Injectable } from '@angular/core';
import {Observable, Subject, Subscriber} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AllStaff} from '../models/AllStaff';
import {FuseSidebarService} from '@theme/components/sidebar/sidebar.service';
import {ShiftDetails} from '../models/ShiftDetails';
import {StaffMember} from '../models/StaffMember';
import { from } from 'rxjs';
import {tap} from 'rxjs/operators';


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
    let staff: AllStaff[] = JSON.parse(localStorage.getItem('staffDirectory'));

    if (staff !== undefined && staff != null) {
      // console.log(staff);
      return Observable.create((observer: Subscriber<any>) => {
        observer.next(staff);
        observer.complete();
      });

      // const arraySource = from(staff);
      // this.next(staff);
      // arraySource.subscribe(val => console.log(val));
    } else {
      return this._http.get<AllStaff[]>('assets/random-data/allStaff.json')
        .pipe(
          tap(e => {
            staff = [];
            e.forEach(item => {
              staff.push(item);
            });

            localStorage.setItem('staffDirectory', JSON.stringify(staff));
          })
        );
    }
  }

  saveStaffMember(newStaffMember: AllStaff): any {
    let staffs: AllStaff[] = JSON.parse(localStorage.getItem('staffDirectory'));

    if (staffs === undefined && staffs == null) {
      staffs = [];
    }

    staffs.push(newStaffMember);
    localStorage.setItem('staffDirectory', JSON.stringify(staffs));

    const resp: any = {
      success : true,
      message : 'User saved successfully'
    };

    return resp;
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
