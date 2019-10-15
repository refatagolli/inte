import {Component, OnInit} from '@angular/core';
import {ShiftDetails} from '../../../models/ShiftDetails';
import {Observable} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  allRequests: {shift: ShiftDetails, requests: any}[] = [];

  constructor(private _dailyService: DailyViewService) {
  }

  ngOnInit() {

    this._dailyService.getRequests().subscribe(e => {
      this.allRequests = e;
    });
  }

}
