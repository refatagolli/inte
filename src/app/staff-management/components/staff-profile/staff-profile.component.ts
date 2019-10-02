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

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit {

  @Output() removed: EventEmitter<any> = new EventEmitter();
  @Input() staffMember: AllStaff;
  @Input() shifts: ShiftType[];
  @Input() days: Days[];
  @Input() staffTypes: StaffType[];
  @Input() employmentTypes: EmploymentType[];
  @Input() genderTypes: Gender[];
  @Input() unit: Unit[];
  showContentOptions = ['Profile', 'Schedule'];
  selectedContent = 'Profile';
  recentShifts: StaffShifts[];
  upcomingShifts: StaffShifts[];
  contacts: Contact[];
  staffMemberForm: FormGroup;
  selectedGender: number;
  selectedUnit: number;
  selectedStaffType: number;
  selectedEmpType: number;
  editPressed = false;
  submitted = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private staffManagementService: StaffManagementService
  ) { }

  ngOnInit() {
    this.retrieveRecentShifts();
    this.retrieveUpcomingShifts();
    this.retrieveStaffContacts();
    this.initializeStaffProfileForm();
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
    this.dialog.open(ShiftDayCombinationsComponent
      , {
        width: '450px',
        data: {
          shiftTimeDays: this.staffMember.shiftDays,
          shifts: this.shifts
        }
      });
  }

  get validateForm() { return this.staffMemberForm.controls; }

  initializeStaffProfileForm() {
    this.staffMemberForm = this.formBuilder.group({
      fullName: [this.staffMember.firstName + ' ' + this.staffMember.lastName, [Validators.required]],
      gender: [this.staffMember.gender.id, [Validators.required]],
      birthDate: [this.staffMember.birthDate],
      ssn: [this.staffMember.ssn],
      location: [this.staffMember.location.id],
      phone: [this.staffMember.phone, [Validators.required]],
      email: [this.staffMember.email, [Validators.required, Validators.email]],
      staffType: [this.staffMember.staffType.staffTypeId, [Validators.required]],
      hireDate: [this.staffMember.hireDate],
      employmentType: [this.staffMember.employmentType.employmentTypeId, [Validators.required]],
      notes: [this.staffMember.notes]
    });
  }

  updateProfile() {

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

}
