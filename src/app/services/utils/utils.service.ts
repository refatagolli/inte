import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FilterConfiguration} from '../../models/FilterConfiguration';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  filterChangeSubject = new Subject<{}>();
  private subject = new Subject<FilterConfiguration[]>();

  constructor() {
  }

  get filterChanges(): Observable<{}> {
    return this.filterChangeSubject.asObservable();
  }

  static getInitialsFromName(name: string): string {
    if (!name) {
      return '';
    }
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  setFilterConfiguration(message: FilterConfiguration[]) {
    this.subject.next(message);
  }

  getFilterConfiguration(): Observable<FilterConfiguration[]> {
    return this.subject.asObservable();
  }

}