import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserResponse} from '../../../models/UserResponse';
import {DailyViewService} from '../../../services/daily-view.service';

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

  ngOnInit() {
    this.userResponses = this._dailyService.getUserResponses();
  }

  setSelectedItem(response: UserResponse) {
    this.selectedItem = response;
  }

}
