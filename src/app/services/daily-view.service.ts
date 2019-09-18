import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DailyViewConfigModel} from '../models/daily-view-config-model';
import {dailyView} from '../config/daily-view-config';
import {HttpClient} from '@angular/common/http';
import {StaffMember} from '../models/StaffMember';

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
}
