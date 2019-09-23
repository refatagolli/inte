import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AllStaff} from '../models/AllStaff';

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {

  constructor(private _http: HttpClient) { }

  getStaffMembers(): Observable<AllStaff[]> {
    return this._http.get<AllStaff[]>('assets/random-data/allStaff.json');
  }
}
