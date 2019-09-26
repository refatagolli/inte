import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShiftManagementService} from '../../../../../shift-management/shift-management.service';

@Component({
  selector: 'request-intelypro',
  templateUrl: './request-intelypro.component.html',
  styleUrls: ['./request-intelypro.component.scss'],
})
export class RequestIntelyproComponent implements OnInit {

  constructor(private _shiftManagementService: ShiftManagementService) {
  }

  ngOnInit() {
  }

  openRequestIntelyPro() {
    this._shiftManagementService.openRequestIntelyPro();
  }
}
