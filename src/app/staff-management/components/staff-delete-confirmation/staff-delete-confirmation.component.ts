import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StaffManagementService} from '../../staff-management.service';

@Component({
  selector: 'app-staff-delete-confirmation',
  templateUrl: './staff-delete-confirmation.component.html',
  styleUrls: ['./staff-delete-confirmation.component.scss']
})
export class StaffDeleteConfirmationComponent implements OnInit {

  staffMemberId: number;
  staffMemberName: string;
  staffMemberSurname: string;
  isIntelypro: boolean;

  constructor(
    private staffManagementService: StaffManagementService,
    public dialogRef: MatDialogRef<StaffDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.staffMemberId = data.id;
    this.staffMemberName = data.name;
    this.staffMemberSurname = data.surname;
    this.isIntelypro = data.isIntelypro;
  }

  ngOnInit() {

  }

  deleteStaffMember(): void {
    this.staffManagementService.removeStaffMember(this.staffMemberId);
    this.staffManagementService.updateStaffTable.next(true);
    this.dialogRef.close();
  }

}
