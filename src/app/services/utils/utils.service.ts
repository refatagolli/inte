import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FilterConfiguration} from '../../models/FilterConfiguration';
import {AllStaff} from '../../models/AllStaff';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  filterChangeSubject = new Subject<{}>();
  searchChanged = new Subject<string>();
  usedComponentSubject = new Subject<string>();
  filterCardChanged = new Subject<boolean>();
  private subject = new Subject<FilterConfiguration[]>();

  constructor() {
  }

  get filterChanges(): Observable<{}> {
    return this.filterChangeSubject.asObservable();
  }

  get searchChanges(): Observable<string> {
    return this.searchChanged.asObservable();
  }

  get filterCardConfigChange(): Observable<boolean> {
    return this.filterCardChanged.asObservable();
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

  setFilterUsedComponent(message: string) {
    this.usedComponentSubject.next(message);
  }

  getFilterUsedComponent(): Observable<string> {
    return this.usedComponentSubject.asObservable();
  }

  registerUser(email: string, pass: string): any {
    const user = {
      email: email,
      password: pass
    };

    let users: any[] = JSON.parse(localStorage.getItem('users'));
    if (users == null) {
      users = [];
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    const resp: any = {
      responseCode : 200, // 400,
      message : 'User saved successfully' // 'An error occured during saving this user!'
    };

    return resp;
  }

  checkCredentials(email: string, pass: string): any {
    const users: any[] = JSON.parse(localStorage.getItem('users'));

    const resp: any = {
      responseCode : 400,
      message : 'Credentials don\'t match!'
    };

    users.forEach(item => {
      if (item.email === email && item.password === pass) {
        resp.responseCode = 200;
        resp.message = 'User logged in successfully!';
      }
    });

    return resp;
  }

  sendRecoveryEmail(email: string) {
    const resp: any = {
      responseCode : 200,
      message : 'Password recovery link was sent to your email!'
    };

    return resp;
  }

  recoverPassword(token: string, pass: string) {
    const resp: any = {
      responseCode : 200,
      message : 'Password was updated successfully!'
    };

    return resp;
  }

}
