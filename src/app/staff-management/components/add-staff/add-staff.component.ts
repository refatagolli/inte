import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';
import {flatMap, map, toArray} from 'rxjs/operators';
import {StaffManagementService} from '../../staff-management.service';
import {AllStaff} from '../../../models/AllStaff';
import {Days} from '../../../models/Days';
import {ShiftType} from '../../../models/ShiftType';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Gender} from '../../../models/Gender';
import {EmploymentType} from '../../../models/EmploymentType';
import {StaffType} from '../../../models/StaffType';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  staffMember: AllStaff;
  shiftDayValidated = true;
  shiftAlreadySelected = false;
  eachRowChosenData: any[];
  staffOptions: Observable<any>;
  employmentOptions: Observable<any>;
  genderOptions: Observable<any>;
  shiftOptions: Observable<any>;
  dayOptions: Observable<any>;
  days: Days[];
  shifts: ShiftType[];
  genderTypes: Gender[];
  employmentTypes: EmploymentType[];
  staffTypes: StaffType[];
  chosenShiftName = 'Shift Time';
  chosenDayName = 'Shift Day';
  shiftOptionsOpened = false;
  dayOptionsOpened = false;
  allCardsCleared = true;
  selectedCheckBox = [];
  selectedRadio = 0;
  submitted = false;
  staffMemberForm: FormGroup;
  selectedGender: [];
  selectedStaff: [];
  selectedEmpType: [];

  constructor(
    private formBuilder: FormBuilder,
    private _dailyService: DailyViewService,
    private staffManagementService: StaffManagementService
  ) {
    this.staffMember = new AllStaff();
    this.staffMember.shiftDays = [];
    this.eachRowChosenData = [];
    this.selectedGender = [];
    this.selectedStaff = [];
    this.selectedEmpType = [];
    this.employmentTypes = [];
    this.days = [];
    this.shifts = [];
    this.employmentTypes = [];
    this.staffTypes = [];
    this.genderTypes = [];
  }

  ngOnInit() {

    // To Do : Continue with update

    this.staffMemberForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: [[], [Validators.required]],
      employmentType: [[], [Validators.required]],
      staffType: [[], [Validators.required]],
      hireDate: ['']
    });

    this.employmentOptions = this._dailyService.getEmploymentTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.employmentTypeName,
        value: e.employmentTypeId
      })),
      toArray());

    this.employmentOptions.subscribe(emptypes => {
      emptypes.forEach(employmentType => {
        const employment: EmploymentType = {
          employmentTypeId: employmentType.value,
          employmentTypeName: employmentType.name
        };
        this.employmentTypes.push(employment);
      });
    });

    this.staffOptions = this._dailyService.getStaffTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.staffTypeName,
        value: e.staffTypeId
      })),
      toArray());

    this.staffOptions.subscribe(staffs => {
      staffs.forEach(item => {
        const staff: StaffType = {
          staffTypeId: item.value,
          staffTypeName: item.name
        };
        this.staffTypes.push(staff);
      });
    });

    this.shiftOptions = this._dailyService.getShiftTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.shiftTypeName,
        value: e.shiftTypeId
      })),
      toArray());

    this.shiftOptions.subscribe(items => {
      items.forEach(item => {
        const shift: ShiftType = {
          shiftTypeId: item.value,
          shiftTypeName: item.name
        };
        this.shifts.push(shift);
      });
    });

    this.dayOptions = this._dailyService.getDays().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.name,
        value: e.id
      })),
      toArray());

    this.dayOptions.subscribe(items => {
      items.forEach(item => {
        const day: Days = {
          id: item.value,
          name: item.name
        };
        this.days.push(day);
      });
    });

    this.genderOptions = this._dailyService.getGenderTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.name,
        value: e.id
      })),
      toArray());

    this.genderOptions.subscribe(genders => {
      genders.forEach(item => {
        const gender: Gender = {
          id: item.value,
          name: item.name
        };
        this.genderTypes.push(gender);
      });
    });


    // genderTypes: Gender[];
    // employmentTypes: EmploymentType[];
    // staffTypes: StaffType[];

  }

  closeSidebar() {
    this.staffManagementService.closePanel();
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

  get validateForm() { return this.staffMemberForm.controls; }

  saveUser() {

    this.submitted = true;
    this.employmentTypes.forEach(item => {
      this.selectedEmpType.forEach(index => {
        if (index === item.employmentTypeId) {
          this.staffMemberForm.controls.employmentType.patchValue(item.employmentTypeId);
          this.staffMember.employmentType = item;
        }
      });
    });

    this.staffTypes.forEach(item => {
      this.selectedStaff.forEach(index => {
        if (index === item.staffTypeId) {
          this.staffMemberForm.controls.staffType.patchValue(item.staffTypeId);
          this.staffMember.staffType = item;
        }
      });
    });

    this.genderTypes.forEach(item => {
      this.selectedGender.forEach(index => {
        if (index === item.id) {
          this.staffMemberForm.controls.gender.patchValue(item.id);
          this.staffMember.gender = item;
        }
      });
    });

    if (this.staffMemberForm.invalid) {
      return;
    }

    this.staffMember.firstName = this.staffMemberForm.controls.name.value;
    this.staffMember.lastName = this.staffMemberForm.controls.surname.value;
    this.staffMember.phone = this.staffMemberForm.controls.phone.value;
    this.staffMember.hireDate = this.staffMemberForm.controls.hireDate.value;
    this.staffMember.email = this.staffMemberForm.controls.email.value;

    const obj = this.staffManagementService.saveStaffMember(this.staffMember);
    console.log(obj);


    // To Do : Save user

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
