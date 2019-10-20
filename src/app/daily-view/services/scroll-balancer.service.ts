import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollBalancerService {

  public scroll: Subject<any> = new Subject();
  public scrollToLeft: Subject<any> = new Subject();
  public scrollToRight: Subject<any> = new Subject();

  constructor() {
  }

  get scrollChange(): Observable<any> {
    return this.scroll.asObservable();
  }
}
