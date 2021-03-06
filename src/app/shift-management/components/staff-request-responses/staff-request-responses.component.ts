import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserResponse} from '../../../models/UserResponse';
import {DailyViewService} from '../../../services/daily-view.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'staff-request-responses',
  templateUrl: './staff-request-responses.component.html',
  styleUrls: ['./staff-request-responses.component.scss']
})
export class StaffRequestResponsesComponent implements OnInit {

  userResponses: Observable<UserResponse[]>;
  selectedItem: UserResponse;
  total: number;

  constructor(private _dailyService: DailyViewService) {
  }

  private static orderResponses(res: UserResponse[]) {
    const a = res.sort((e, f) => {
      return e.response > f.response ? 1 :
        e.response < f.response ? -1 : 0;
    });
    return a;

  }

  ngOnInit() {
    this.userResponses = this._dailyService.getUserResponses().pipe(
      map(StaffRequestResponsesComponent.orderResponses),
      tap(e => this.total = e.length)
    );
  }

  setSelectedItem(response: UserResponse) {
    this.selectedItem = response;
  }
}
