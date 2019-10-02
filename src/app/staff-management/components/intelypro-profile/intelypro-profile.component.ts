import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AllStaff} from '../../../models/AllStaff';
import {StaffShifts} from '../../../models/StaffShifts';
import {Contact} from '../../../models/Contact';
import {StaffManagementService} from '../../staff-management.service';
import {WorkEligibility} from '../../../models/WorkEligibility';
import {Document} from '../../../models/Document';
import {MatDialog} from '@angular/material';
import {ShiftType} from '../../../models/ShiftType';
import {RatingHistoryComponent} from '../rating-history/rating-history.component';

@Component({
  selector: 'app-intelypro-profile',
  templateUrl: './intelypro-profile.component.html',
  styleUrls: ['./intelypro-profile.component.scss']
})
export class IntelyproProfileComponent implements OnInit {

  @Output() removed: EventEmitter<any> = new EventEmitter();
  @Input() staffMember: AllStaff;
  @Input() shifts: ShiftType[];
  showContentOptions = ['Profile', 'Documents', 'Schedule'];
  selectedContent = 'Profile';
  recentShifts: StaffShifts[];
  upcomingShifts: StaffShifts[];
  contacts: Contact[];
  workEligibilityData: WorkEligibility[];
  documents: Document[];

  constructor(
    public dialog: MatDialog,
    private staffManagementService: StaffManagementService
  ) { }

  ngOnInit() {
    this.retrieveRecentShifts();
    this.retrieveUpcomingShifts();
    this.retrieveStaffContacts();
    this.retrieveDocuments();
    this.retrieveWorkEligibility();
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

  retrieveDocuments() {
    this.staffManagementService.getDocuments(this.staffMember.id).pipe().subscribe(item => {
      this.documents = item;
    });
  }

  retrieveWorkEligibility() {
    this.staffManagementService.getWorkEligibilityData(this.staffMember.id).pipe().subscribe(item => {
      this.workEligibilityData = item;
    });
  }

  viewRatingsPanel() {
    this.dialog.open(RatingHistoryComponent
      , {
        width: '650px',
        data: {
          id: this.staffMember.id
        }
      });
  }

  handleTabChange(e) {
    this.selectedContent = this.showContentOptions[e.index];
  }

}
