import { Injectable } from '@angular/core';
import {Observable, Subject, Subscriber} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AllStaff} from '../models/AllStaff';
import {FuseSidebarService} from '@theme/components/sidebar/sidebar.service';
import {tap} from 'rxjs/operators';
import {FuseSidebarComponent} from '@theme/components/sidebar/sidebar.component';
import {ShiftType} from '../models/ShiftType';
import {Days} from '../models/Days';
import {Gender} from '../models/Gender';
import {StaffShifts} from '../models/StaffShifts';
import {Contact} from '../models/Contact';
import {WorkEligibility} from '../models/WorkEligibility';
import {Document} from '../models/Document';
import {Rating} from '../models/Rating';


@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {

  public static ADD_STAFF = 'addStaff';
  public staffChange: Subject<{ staffMember: AllStaff, viewType: string, shifts: ShiftType[], days: Days[] }> = new Subject();
  public updateStaffTable: Subject<boolean> = new Subject();
  public profileClicked: Subject<AllStaff> = new Subject();
  private _sidebarName = 'staffManagement';
  private _sidebar: FuseSidebarComponent;

  constructor(
    private _http: HttpClient,
    private _sidebareService: FuseSidebarService
  ) { }

  getStaffMembers(): Observable<AllStaff[]> {
    let staff: AllStaff[] = JSON.parse(localStorage.getItem('staffDirectory'));

    if (staff !== undefined && staff != null) {

      return Observable.create((observer: Subscriber<any>) => {
        observer.next(staff);
        observer.complete();
      });

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

  getClickedProfile(): Observable<AllStaff> {
    return this.profileClicked.asObservable();
  }

  saveStaffMember(staffMember: AllStaff): any {
    this._openIfClosed();
    let staffs: AllStaff[] = JSON.parse(localStorage.getItem('staffDirectory'));

    if (staffs === undefined && staffs == null) {
      staffs = [];
    }

    if (staffMember.id) {
      let index = 0, i = 0;
      staffs.forEach(staff => {
        if (staff.id === staffMember.id) {
          i = index;
        }
        index++;
      });
      staffs[i] = staffMember;
    } else {
      staffMember.id = staffs.length + 1;
      staffs.push(staffMember);
    }

    localStorage.setItem('staffDirectory', JSON.stringify(staffs));

    const resp: any = {
      success : true,
      message : 'User saved successfully'
    };

    return resp;
  }

  openAddStaffPanel(shifts: ShiftType[], days: Days[]) {
    this._openIfClosed();
    this.staffChange.next({ staffMember: null, viewType: StaffManagementService.ADD_STAFF, shifts: shifts, days: days });
  }

  openEditStaffPanel(shifts: ShiftType[], days: Days[], staffMember: AllStaff) {
    this._openIfClosed();
    this.staffChange.next({ staffMember: staffMember, viewType: StaffManagementService.ADD_STAFF, shifts: shifts, days: days });
  }

  getStaffMemberUpcomingShifts(id: number): Observable<StaffShifts[]> {
    return this._http.get<StaffShifts[]>('assets/random-data/upcomingStaffShifts.json');
  }

  getStaffMemberRecentShifts(id: number): Observable<StaffShifts[]> {
    return this._http.get<StaffShifts[]>('assets/random-data/recentStaffShifts.json');
  }

  getStaffContacts(id: number): Observable<Contact[]> {
    return this._http.get<Contact[]>('assets/random-data/contacts.json');
  }

  getDocuments(id: number): Observable<Document[]> {
    return this._http.get<Document[]>('assets/random-data/documents.json');
  }

  getWorkEligibilityData(id: number): Observable<WorkEligibility[]> {
    return this._http.get<WorkEligibility[]>('assets/random-data/workEligibility.json');
  }

  getstaffMemberRatingHistory(id: number): Observable<Rating[]> {
    return this._http.get<Rating[]>('assets/random-data/ratings.json');
  }

  closePanel() {
    if (this._sidebar.opened) {
      this._sidebareService.getSidebar(this._sidebarName).toggleOpen();
    }
    this.staffChange.next(null);
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
