import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserResponse} from '../../../models/UserResponse';
import {DailyViewService} from '../../../services/daily-view.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'staff-request-responses',
  templateUrl: './staff-request-responses.component.html',
  styleUrls: ['./staff-request-responses.component.scss']
})
export class StaffRequestResponsesComponent implements OnInit {

  userResponses: Observable<UserResponse[]>;
  selectedItem: UserResponse;

  constructor(private _dailyService: DailyViewService) {
  }

  private static orderResponses(res: UserResponse[]) {
    const a = res.sort((e, f) => e.response === 'accept' ? 1 : e.response === 'pending' ? 0 : -1);
  console.log(a)
    return a ;

  }

  ngOnInit() {
    this.userResponses = this._dailyService.getUserResponses().pipe(
      map(StaffRequestResponsesComponent.orderResponses)
    );
  }

  setSelectedItem(response: UserResponse) {
    this.selectedItem = response;
  }
}
