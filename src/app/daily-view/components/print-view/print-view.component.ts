import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {StaffMember} from '../../../models/StaffMember';
import {DailyViewService} from '../../../services/daily-view.service';
import {filter, flatMap, tap, toArray} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.scss']
})
export class PrintViewComponent implements OnInit {

  control: FormControl = new FormControl('');
  showResults = false;
  selectedStaff: StaffMember;

  users: Observable<StaffMember[]>;
  filter = new BehaviorSubject<any>('');

  constructor(private _dailyService: DailyViewService,
              private _dialogRef: MatDialogRef<PrintViewComponent>) {
  }

  ngOnInit() {
    this.users = this.filter.pipe(
      tap(console.log),
      flatMap(e => this._dailyService.getStaff().pipe(
        flatMap(f => f),
        filter(c => c.fullName.indexOf(e) > -1),
        toArray()
      ))
    );
  }

  addUser() {
    this.showResults = false;
  }

  cancel() {
    this.selectedStaff = null;
    this.showResults = false;
  }

  close() {
    this._dialogRef.close();
  }
}
