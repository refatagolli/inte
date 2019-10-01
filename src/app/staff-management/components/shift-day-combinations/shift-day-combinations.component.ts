import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShiftDaysTypeRelation} from '../../../models/ShiftDaysTypeRelation';
import {ShiftType} from '../../../models/ShiftType';

@Component({
  selector: 'app-shift-day-combinations',
  templateUrl: './shift-day-combinations.component.html',
  styleUrls: ['./shift-day-combinations.component.scss']
})
export class ShiftDayCombinationsComponent implements OnInit {

  shiftTimeDays: ShiftDaysTypeRelation[];
  eachRowChosenData: any[];
  shifts: ShiftType[];

  constructor(
    public dialogRef: MatDialogRef<ShiftDayCombinationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shiftTimeDays = data.shiftTimeDays;
    this.shifts = data.shifts;
    this.eachRowChosenData = [];
  }

  ngOnInit() {
    this.shifts.forEach(shift => {
      const daysPerShift = [];
      let daysNameToShow = '';
      this.shiftTimeDays.forEach(item => {
        if (shift.shiftTypeId === item.shiftType.shiftTypeId) {
          daysPerShift.push(item.day.id);
          daysNameToShow +=  item.day.name.substr(0, 3) + ', ';
        }
      });
      if (daysPerShift.length > 0) {
        daysNameToShow = daysNameToShow.substr(0, daysNameToShow.length - 2);
        const eachDayShiftChosenArray = {
          id : this.eachRowChosenData ? this.eachRowChosenData.length + 1 : 1,
          selectedDays : daysPerShift,
          selectedShifts : shift.shiftTypeId,
          chosenDaysName : daysNameToShow,
          chosenShiftName : shift.shiftTypeName,
          showDayCard : false,
          showStaffCard : false
        };
        this.eachRowChosenData.push(eachDayShiftChosenArray);
      }
    });
  }

}
