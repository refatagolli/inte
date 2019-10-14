import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DailyViewService} from '../../../../../services/daily-view.service';
import {ShiftManagementService} from '../../../../../shift-management/shift-management.service';
import {ShiftDetails} from '../../../../../models/ShiftDetails';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsComponent implements OnInit {

  requests: {
    shift: ShiftDetails,
    requests: any;
  }[] = [];
  current = 1;

  constructor(private _dailyService: DailyViewService,
              private _shiftManagementService: ShiftManagementService,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._dailyService.getRequests().subscribe(e => {
      this.requests = e;
      this._cdr.detectChanges();
    });
  }


  goBack() {
    this.current--;
    this._cdr.markForCheck();
  }

  goForward() {
    this.current++;
    this._cdr.markForCheck();
  }

  openRequests() {
    this._shiftManagementService.openRequests();
  }

  openCurrentRequest() {
    this._shiftManagementService.openFillShiftRequestsPanel(this.requests[this.current - 1].shift, this.requests[this.current - 1].requests);
  }

}
