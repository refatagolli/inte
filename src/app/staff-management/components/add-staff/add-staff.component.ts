import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, toArray} from 'rxjs/operators';
import {StaffManagementService} from '../../staff-management.service';
import {AllStaff} from '../../../models/AllStaff';
import {ShiftDaysTypeRelation} from '../../../models/ShiftDaysTypeRelation';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  staffMember: AllStaff;
  shiftDaysCombination: ShiftDaysTypeRelation[];
  staffOptions: Observable<any>;
  employmentOptions: Observable<any>;
  genderOptions: Observable<any>;
  shiftOptions: Observable<any>;
  dayOptions: Observable<any>;
  chosenShiftName = 'Shift Time';
  shiftOptionsOpened = false;
  chosenDayName = 'Shift Day';
  dayOptionsOpened = false;

  constructor(
    private _dailyService: DailyViewService,
    private staffManagementService: StaffManagementService
  ) {
    this.staffMember = new AllStaff();
    this.staffMember.shiftDays = [];
  }

  ngOnInit() {

    this.employmentOptions = this._dailyService.getEmploymentTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.employmentTypeName,
        value: e.employmentTypeId
      })),
      toArray());

    this.staffOptions = this._dailyService.getStaffTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.staffTypeName,
        value: e.staffTypeId
      })),
      toArray());

    this.shiftOptions = this._dailyService.getShiftTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.shiftTypeName,
        value: e.shiftTypeId
      })),
      toArray());

    this.dayOptions = this._dailyService.getDays().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.name,
        value: e.id
      })),
      toArray());

    this.genderOptions = this._dailyService.getGenderTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.name,
        value: e.id
      })),
      toArray());

  }

  closeSidebar() {
    this.staffManagementService.closePanel();
  }

  toggleShiftOptions() {
    this.shiftOptionsOpened = !this.shiftOptionsOpened;
  }

  toggleDayOptions() {
    this.dayOptionsOpened = !this.dayOptionsOpened;
  }

  check (e) {
    console.log(e);
  }

  createNewShiftDay(){

  }

  updateExistingShiftDay(){

  }

}
