import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShiftDaysTypeRelation} from '../../../models/ShiftDaysTypeRelation';
import {ShiftType} from '../../../models/ShiftType';
import {Observable} from 'rxjs';
import {flatMap, map, toArray} from 'rxjs/operators';
import {DailyViewService} from '../../../services/daily-view.service';
import {Days} from '../../../models/Days';

@Component({
  selector: 'app-shift-day-combinations',
  templateUrl: './shift-day-combinations.component.html',
  styleUrls: ['./shift-day-combinations.component.scss']
})
export class ShiftDayCombinationsComponent implements OnInit {

  shiftTimeDays: ShiftDaysTypeRelation[];
  eachRowChosenData: any[];
  shifts: ShiftType[];
  days: Days[];
  chosenShiftName = 'Shift Time';
  chosenDayName = 'Shift Day';
  shiftDayValidated = true;
  shiftAlreadySelected = false;
  shiftOptionsOpened = false;
  dayOptionsOpened = false;
  shiftOptions: Observable<any>;
  dayOptions: Observable<any>;
  allCardsCleared = true;
  selectedCheckBox = [];
  selectedRadio = 0;

  constructor(
    public dialogRef: MatDialogRef<ShiftDayCombinationsComponent>,
    public _dailyService: DailyViewService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shiftTimeDays = data.shiftTimeDays;
    this.shifts = data.shifts;
    this.days = data.days;
    this.eachRowChosenData = [];
  }

  ngOnInit() {

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

    this.shifts.forEach(shift => {
      const daysPerShift = [];
      let daysNameToShow = '';
      this.shiftTimeDays.forEach(item => {
        if (shift.shiftTypeId === item.shiftType.shiftTypeId) {
          daysPerShift.push(item.day.id);
          daysNameToShow +=  item.day.name.substr(0, 1) + ', ';
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
        this.selectedCheckBox = daysPerShift;
        this.selectedRadio = shift.shiftTypeId;
        this.chosenDayName = daysNameToShow;
        this.chosenShiftName = shift.shiftTypeName;
        this.dayOptionsOpened = false;
        this.shiftOptionsOpened = false;
      }
    });
    this.eachRowChosenData.pop();

    console.log(this.eachRowChosenData);
  }

  toggleDayOptions(id: number = 0) {
    this.allCardsCleared = false;

    if (id === 0) {
      this.dayOptionsOpened = !this.dayOptionsOpened;
    } else {
      this.eachRowChosenData.forEach(item => {
        if (item.id === id) {
          item.showDayCard = true;
        }
      });
    }
  }

  toggleShiftOptions(id: number = 0) {
    this.allCardsCleared = false;

    if (id === 0) {
      this.shiftOptionsOpened = !this.shiftOptionsOpened;
    } else {
      this.eachRowChosenData.forEach(item => {
        if (item.id === id) {
          item.showStaffCard = true;
        }
      });
    }
  }

  addNewShiftDayCombination() {
    if (this.selectedRadio !== 0 && this.selectedCheckBox.length !== 0) {

      const chosenData = {
        id : this.eachRowChosenData ? this.eachRowChosenData.length + 1 : 1,
        selectedDays : this.selectedCheckBox,
        selectedShifts : this.selectedRadio,
        chosenDaysName : this.chosenDayName,
        chosenShiftName : this.chosenShiftName,
        showDayCard : false,
        showStaffCard : false
      };

      this.eachRowChosenData.push(chosenData);
      this.selectedRadio = 0;
      this.selectedCheckBox = [];
      this.chosenDayName = 'Shift Time';
      this.chosenShiftName = 'Shift Day';
      // let shift: ShiftType;
      // this.shifts.forEach(item => {
      //   if (item.shiftTypeId === this.selectedRadio) {
      //     shift = item;
      //   }
      // });
      //
      // this.days.forEach(day => {
      //   this.selectedCheckBox.forEach(selected => {
      //     if (selected === day.id) {
      //       const dayShift: ShiftDaysTypeRelation = {
      //         id : this.staffMember.shiftDays.length + 1,
      //         shiftType : shift,
      //         day : day
      //       };
      //       this.staffMember.shiftDays.push(dayShift);
      //     }
      //   });
      // });
    } else {
      this.shiftDayValidated = false;
      const that = this;

      setTimeout(function () {
        that.shiftDayValidated = true;
      }, 3000);
    }
  }

  manageChosenData(comp: string, e: any, id: number = 0) {
    // Check which component triggered the change
    switch (comp) {
      case 'check' :
        // Day checkbox component
        let dayFormatedName = '';

        // Format the showing name on button
        this.days.forEach(day => {
          e.forEach(item => {
            if (day.id === item) {
              dayFormatedName += day.name.substr(0, 1) + ', ';
            }
          });
        });

        dayFormatedName = dayFormatedName.substr(0, dayFormatedName.length - 2);

        // Check if it is a new record added on a new component or an existing one above
        if (id === 0) {
          // Update the name of the new component
          this.chosenDayName = dayFormatedName;
          if (this.chosenDayName === '') {
            this.chosenDayName = 'Shift Day';
          }
        } else {
          // Update the existing values
          this.eachRowChosenData.forEach(item => {
            if (item.id === id) {
              item.selectedDays = e;
              item.chosenDaysName = dayFormatedName;
            }
          });
        }
        break;

      case 'radio' :
        // Updated or created record came from a change on Shifts radio button
        this.clearAllCards();
        let shiftName = '';
        // Retrieve shift name from id
        this.shifts.forEach(shift => {
          if (shift.shiftTypeId === e) {
            shiftName = shift.shiftTypeName;
          }
        });
        // Check if there are already existing records on array or this is a new shift option chosen
        if (this.eachRowChosenData && this.eachRowChosenData.length > 0) {
          let found = false;
          this.eachRowChosenData.forEach(item => {
            // Check if Shift type already chosen earlier, on both create and update
            if ((item.selectedShifts === e && (item.id !== id || id === 0)) || (e === this.selectedRadio && id !== 0)) {
              found = true;
              // Chosen shift is an already chosen one above or below
              if (id === 0) {
                this.selectedRadio = 0;
                this.chosenShiftName = 'Shift Time';
              }

              this.shiftAlreadySelected = true;
              const that = this;
              setTimeout(function () {
                that.shiftAlreadySelected = false;
              }, 3000);
            }
          });

          if (!found) {
            this.shiftAlreadySelected = false;
            // It is a new chosen shift type
            if (id === 0) {
              this.chosenShiftName = shiftName;

              if (this.chosenShiftName === '') {
                this.chosenShiftName = 'Shift Time';
              }
            } else {
              this.eachRowChosenData.forEach(item => {
                if (item.id === id) {
                  item.selectedShifts = e;
                  item.chosenShiftName = shiftName;
                }
              });
            }
          }
        } else {
          this.chosenShiftName = shiftName;
          if (this.chosenShiftName === '') {
            this.chosenShiftName = 'Shift Time';
          }
        }
        break;
    }
  }

  removeShiftDayCombination(id: number) {
    let index = 0;
    let i = 0;
    this.eachRowChosenData.forEach(item => {
      if (item.id === id) {
        index = i;
        return;
      }
      i++;
    });


    this.eachRowChosenData.splice(index, 1);
  }

  applySelected() {

    this.shiftTimeDays = [];

    this.eachRowChosenData.forEach(row => {
      let eachShift: ShiftType;
      this.shifts.forEach(shift => {
        if (shift.shiftTypeId === row.selectedShifts) {
          eachShift = shift;
        }
      });

      this.days.forEach(day => {
        row.selectedDays.forEach(index => {
          if (day.id === index) {
            const shiftDay: ShiftDaysTypeRelation = {
              id : this.shiftTimeDays.length + 1,
              day : day,
              shiftType : eachShift
            };
            this.shiftTimeDays.push(shiftDay);
          }
        });
      });
    });

    if (this.selectedRadio !== 0 && (this.selectedCheckBox != null || this.selectedCheckBox.length !== 0)) {
      let shift: ShiftType;
      this.shifts.forEach(shiftType => {
        if (shiftType.shiftTypeId === this.selectedRadio) {
          shift = shiftType;
        }
      });

      this.days.forEach(day => {
        this.selectedCheckBox.forEach(index => {
          if (day.id === index) {
            const shiftDay: ShiftDaysTypeRelation = {
              id : this.shiftTimeDays.length + 1,
              day : day,
              shiftType : shift
            };
            this.shiftTimeDays.push(shiftDay);
          }
        });
      });
    }

    this.dialogRef.close(this.shiftTimeDays);
  }

  clearAllCards() {
    this.dayOptionsOpened = false;
    this.shiftOptionsOpened = false;
    this.eachRowChosenData.forEach(item => {
      item.showStaffCard = false;
      item.showDayCard = false;
    });

    this.allCardsCleared = true;
  }
}
