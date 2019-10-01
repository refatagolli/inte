import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Rating} from '../../../models/Rating';
import {StaffManagementService} from '../../staff-management.service';

@Component({
  selector: 'app-rating-history',
  templateUrl: './rating-history.component.html',
  styleUrls: ['./rating-history.component.scss']
})
export class RatingHistoryComponent implements OnInit {

  staffId: number;
  ratings: Rating[];

  constructor(
    public dialogRef: MatDialogRef<RatingHistoryComponent>,
    public staffManagementService: StaffManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.staffId = data.id;
  }

  ngOnInit() {
    this.retrieveRatingData();
  }

  retrieveRatingData() {
    this.staffManagementService.getstaffMemberRatingHistory(this.staffId).pipe().subscribe(items => {
      this.ratings = items;
    });
  }

  closeMyself() {
    this.dialogRef.close(123);
  }

}
