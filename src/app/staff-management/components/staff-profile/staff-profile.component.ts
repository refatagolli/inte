import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AllStaff} from '../../../models/AllStaff';
import {StaffManagementService} from '../../staff-management.service';
import {StaffShifts} from '../../../models/StaffShifts';
import {Contact} from '../../../models/Contact';
import {StaffType} from '../../../models/StaffType';
import {EmploymentType} from '../../../models/EmploymentType';
import {Gender} from '../../../models/Gender';
import {ShiftType} from '../../../models/ShiftType';
import {Days} from '../../../models/Days';
import {ShiftDayCombinationsComponent} from '../shift-day-combinations/shift-day-combinations.component';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../models/Unit';
import {Observable} from 'rxjs';
import {flatMap, map, tap, toArray} from 'rxjs/operators';
import {DailyViewService} from '../../../services/daily-view.service';
import {ShiftDaysTypeRelation} from '../../../models/ShiftDaysTypeRelation';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit {

  @Output() removed: EventEmitter<any> = new EventEmitter();
  @Output() userUpdated: EventEmitter<AllStaff> = new EventEmitter();
  @Input() staffMember: AllStaff;
  @Input() shifts: ShiftType[];
  @Input() days: Days[];
  @Input() staffTypes: StaffType[];
  @Input() employmentTypes: EmploymentType[];
  @Input() genderTypes: Gender[];
  @Input() unit: Unit[];
  shiftDays: ShiftDaysTypeRelation[];
  shiftDaysString: string;
  showContentOptions = ['Profile', 'Schedule'];
  selectedContent = 'Profile';
  recentShifts: StaffShifts[];
  upcomingShifts: StaffShifts[];
  contacts: Contact[];
  staffMemberForm: FormGroup;
  selectedGender: string;
  genderOptionOpened = false;
  genderOptions: Observable<any>;
  selectedUnit: string;
  unitOptionOpened = false;
  unitOptions: Observable<any>;
  selectedStaffType: string;
  staffTypeOptionOpened = false;
  staffOptions: Observable<any>;
  selectedEmpType: string;
  empTypeOptionOpened = false;
  employmentOptions: Observable<any>;
  allCardsCleared = true;
  editPressed = false;
  submitted = false;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private staffManagementService: StaffManagementService,
    private _dailyService: DailyViewService,
  ) {}

  ngOnInit() {
    this.shiftDays = this.staffMember.shiftDays;
    this.shiftDaysString = this.staffMember.shiftDaysString;
    this.retrieveRecentShifts();
    this.retrieveUpcomingShifts();
    this.retrieveStaffContacts();
    this.initializeStaffProfileForm();
    this.initializeDropDowns();
  }

  initializeDropDowns() {
    this.genderOptions = this._dailyService.getGenderTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.name,
        value: e.id
      })),
      toArray());

    this.unitOptions = this._dailyService.getUnits().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.value,
        value: e.id
      })),
      toArray());

    this.staffOptions = this._dailyService.getStaffTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.staffTypeName,
        value: e.staffTypeId
      })),
      toArray());

    this.employmentOptions = this._dailyService.getEmploymentTypes().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.employmentTypeName,
        value: e.employmentTypeId
      })),
      toArray());
  }

  retrieveRecentShifts() {
    this.staffManagementService.getStaffMemberRecentShifts(this.staffMember.id).pipe().subscribe(item => {
      this.recentShifts = item;
    });
  }

  retrieveUpcomingShifts() {
    this.staffManagementService.getStaffMemberUpcomingShifts(this.staffMember.id).pipe().subscribe(item => {
      this.upcomingShifts = item;
    });
  }

  retrieveStaffContacts() {
    this.staffManagementService.getStaffContacts(this.staffMember.id).pipe().subscribe(item => {
      this.contacts = item;
    });
  }

  viewShiftsPanel() {
    const dialogRef = this.dialog.open(ShiftDayCombinationsComponent
      , {
        width: '450px',
        data: {
          shiftTimeDays: this.shiftDays,
          shifts: this.shifts,
          days: this.days
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.shiftDays = result;
        this.shiftDaysString = '';
        this.shifts.forEach(item => {
          let existsShift = false;

          this.shiftDays.forEach(eachShift => {
            if (eachShift.shiftType.shiftTypeId === item.shiftTypeId) {
              this.shiftDaysString += eachShift.day.name.substring(0, 3) + ', ';
              existsShift = true;
            }
          });

          if (existsShift) {
            this.shiftDaysString = this.shiftDaysString.substring(0, this.shiftDaysString.length - 2);
            this.shiftDaysString += ': ' + item.shiftTypeName + '<br />';
          }
        });

        this.shiftDaysString = this.shiftDaysString.substring(0, this.shiftDaysString.length - 6);
      }
    });
  }

  get validateForm() { return this.staffMemberForm.controls; }

  initializeStaffProfileForm() {
    let locationId = 0;
    this.selectedUnit = '';
    if (this.staffMember.location) {
      locationId = this.staffMember.location.id;
      this.unitSelected(locationId);
    }

    this.genderSelected(this.staffMember.gender.id);
    this.staffSelected(this.staffMember.staffType.staffTypeId);
    this.employmentSelected(this.staffMember.employmentType.employmentTypeId);

    this.staffMemberForm = this.formBuilder.group({
      fullName: [this.staffMember.firstName + ' ' + this.staffMember.lastName, [Validators.required]],
      gender: [this.staffMember.gender.id, [Validators.required]],
      birthDate: [this.staffMember.birthDate],
      ssn: [this.staffMember.ssn],
      location: [locationId],
      phone: [this.staffMember.phone, [Validators.required]],
      email: [this.staffMember.email, [Validators.required, Validators.email]],
      staffType: [this.staffMember.staffType.staffTypeId, [Validators.required]],
      hireDate: [this.staffMember.hireDate],
      employmentType: [this.staffMember.employmentType.employmentTypeId, [Validators.required]],
      notes: [this.staffMember.notes]
    });
  }

  cancelUpdate() {
    this.editPressed = false;
  }

  notesChanged() {
    const response = this.staffManagementService.updateNotes(this.staffMember.id, this.staffMemberForm.controls.notes.value);
  }

  handleTabChange(e) {
    this.selectedContent = this.showContentOptions[e.index];
  }

  manageChosenData(type: string, e) {
    switch (type) {
      case 'gender' :
        this.selectedGender = '';
        this.staffMemberForm.controls.gender.patchValue(e);
        this.genderSelected(e);
        break;

      case 'unit' :
        this.selectedUnit = '';
        this.staffMemberForm.controls.location.patchValue(e);
        this.unitSelected(e);
        break;

      case 'staff' :
        this.selectedStaffType = '';
        this.staffMemberForm.controls.staffType.patchValue(e);
        this.staffSelected(e);
        break;

      case 'employment' :
        this.selectedEmpType = '';
        this.staffMemberForm.controls.employmentType.patchValue(e);
        this.employmentSelected(e);
        break;
    }

    this.clearAllCards();
  }

  genderSelected(val: number) {
    this.genderTypes.forEach(item => {
      if (item.id === val) {
        this.selectedGender = item.name;
        return;
      }
    });
  }

  unitSelected(val: number) {
    this.unit.forEach(item => {
      if (item.id === val) {
        this.selectedUnit = item.value;
        return;
      }
    });
  }

  staffSelected(val: number) {
    this.staffTypes.forEach(item => {
      if (item.staffTypeId === val) {
        this.selectedStaffType = item.staffTypeName;
        return;
      }
    });
  }

  employmentSelected(val: number) {
    this.employmentTypes.forEach(item => {
      if (item.employmentTypeId === val) {
        this.selectedEmpType = item.employmentTypeName;
        return;
      }
    });
  }

  clearAllCards() {
    this.unitOptionOpened = false;
    this.staffTypeOptionOpened = false;
    this.empTypeOptionOpened = false;
    this.genderOptionOpened = false;
    this.allCardsCleared = true;
  }

  updateStaffMember() {
    this.submitted = true;
    if (this.staffMemberForm.invalid) {
      return;
    }

    const staff = new AllStaff();
    staff.id = this.staffMember.id;

    this.employmentTypes.forEach(item => {
      if (this.staffMemberForm.controls.employmentType.value === item.employmentTypeId) {
        staff.employmentType = item;
      }
    });

    this.staffTypes.forEach(item => {
      if (this.staffMemberForm.controls.staffType.value === item.staffTypeId) {
        staff.staffType = item;
      }
    });

    this.genderTypes.forEach(item => {
      if (this.staffMemberForm.controls.gender.value === item.id) {
        staff.gender = item;
      }
    });

    staff.location = null;

    this.unit.forEach(item => {
      if (this.staffMemberForm.controls.location.value === item.id) {
        staff.location = item;
      }
    });

    const name: string[] = this.staffMemberForm.controls.fullName.value.split(' ');
    staff.firstName = name.length > 0 ? name[0] : '';
    staff.lastName = name.length > 1 ? name[1] : '';
    staff.phone = this.staffMemberForm.controls.phone.value;
    staff.hireDate = this.staffMemberForm.controls.hireDate.value;
    staff.birthDate = this.staffMemberForm.controls.birthDate.value;
    staff.email = this.staffMemberForm.controls.email.value;
    staff.ssn = this.staffMemberForm.controls.ssn.value;
    staff.shiftDaysString = this.shiftDaysString;
    staff.shiftDays = this.shiftDays;
    const obj = this.staffManagementService.updateStaffMember(staff);

    if (obj.success === true) {
      this.staffMember = staff;
      this.userUpdated.next(staff);
      this.editPressed = false;
      this._snackBar.open('Staff member ' + staff.firstName + ' ' + staff.lastName + ' was updated successfully', '', {
        duration: 2000,
      });
    } else {

    }

  }

}
