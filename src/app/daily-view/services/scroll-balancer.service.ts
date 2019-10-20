import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollBalancerService {

  public scroll: Subject<any> = new Subject();
  public scrollToLeft: Subject<any> = new Subject();
  public scrollToRight: Subject<any> = new Subject();

  constructor() {
  }
}
