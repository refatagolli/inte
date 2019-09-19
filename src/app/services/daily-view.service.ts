import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DailyViewConfigModel} from '../models/daily-view-config-model';
import {dailyView} from '../config/daily-view-config';
import {HttpClient} from '@angular/common/http';
import {StaffMember} from '../models/StaffMember';
import {EmploymentType} from '../models/EmploymentType';
import {ShiftType} from '../models/ShiftType';
import {StaffType} from '../models/StaffType';

@Injectable({
  providedIn: 'root'
})
export class DailyViewService {

  dailyViewConfig: BehaviorSubject<DailyViewConfigModel> = new BehaviorSubject(dailyView);

  constructor(private _http: HttpClient) {
  }

  getStaff(): Observable<StaffMember[]> {
    return this._http.get<StaffMember[]>('assets/random-data/randomusers.json');
  }

  getUnits(): Observable<any[]> {
    return this._http.get<any[]>('assets/random-data/randomunits.json');
  }

  getReasons(): Observable<any[]> {
    return this._http.get<any[]>('assets/random-data/randomreasons.json');
  }

  getShifts(): Observable<any[]> {
    return this._http.get<any[]>('assets/random-data/randomshifts.json');
  }

  getTasks(): Observable<any[]> {
    return this._http.get<any[]>('assets/random-data/randomtasks.json');
  }

  getEmploymentTypes(): Observable<EmploymentType[]> {
    return this._http.get<EmploymentType[]>('assets/random-data/employmentTypes.json');
  }

  getShiftTypes(): Observable<ShiftType[]> {
    return this._http.get<ShiftType[]>('assets/random-data/shiftTypes.json');
  }

  getStaffTypes(): Observable<StaffType[]> {
    return this._http.get<StaffType[]>('assets/random-data/staffTypes.json');
  }
}
