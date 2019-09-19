import {Component, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss']
})
export class DailyViewComponent implements OnInit {

  filterConfig: FilterConfiguration[] = [
    { key: 'shift_type', name: 'Shift Options' },
    { key: 'unit_type', name: 'Unit Options' }
  ];

  constructor(private utils: UtilsService) { }

  ngOnInit() {

    this.utils.setFilterConfiguration(this.filterConfig);
  }

}
