import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {UtilsService} from '../services/utils/utils.service';
import {FilterConfiguration} from '../models/FilterConfiguration';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit {

  filterConfig: FilterConfiguration[] = [
    { key: 'shift_type', name: 'Shift Time' },
    { key: 'employment_type', name: 'Employment Type' },
    { key: 'staff_type', name: 'Staff Type' },
    { key: 'shift_days', name: 'Shift Days' }
  ];

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    this.utils.setFilterConfiguration(this.filterConfig);
  }

}
