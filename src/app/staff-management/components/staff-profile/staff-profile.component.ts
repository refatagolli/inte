import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AllStaff} from '../../../models/AllStaff';
import {StaffManagementService} from '../../staff-management.service';
import {StaffShifts} from '../../../models/StaffShifts';
import {Contact} from '../../../models/Contact';
import {ShiftType} from '../../../models/ShiftType';
import {Days} from '../../../models/Days';
import {ShiftDayCombinationsComponent} from '../shift-day-combinations/shift-day-combinations.component';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  showContentOptions = ['Profile', 'Schedule'];
  selectedContent = 'Profile';
  recentShifts: StaffShifts[];
  upcomingShifts: StaffShifts[];
  contacts: Contact[];
  staffMemberForm: FormGroup;
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
      fullName: [this.staffMember.firstName, [Validators.required]],
      surname: [this.staffMember.lastName, [Validators.required]],
      phone: [this.staffMember.phone, [Validators.required]],
      email: [this.staffMember.email, [Validators.required, Validators.email]],
      // gender: [this.selectedGender, [Validators.required]],
      // employmentType: [this.selectedEmpType, [Validators.required]],
      // staffType: [this.selectedStaff, [Validators.required]],
      hireDate: [this.staffMember.hireDate]
    });
  }

  handleTabChange(e) {
    this.selectedContent = this.showContentOptions[e.index];
  }

}
