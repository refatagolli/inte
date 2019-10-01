import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicFloatingContentService} from '../../../shared/services/dynamic-floating-content.service';
import {merge, Observable, Subject} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';
import {filter, flatMap, map, toArray} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'shift-management-filter',
  templateUrl: './shift-management-filter.component.html',
  styleUrls: ['./shift-management-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftManagementFilterComponent implements OnInit, AfterViewInit {

  @Output() filterChange: EventEmitter<{}> = new EventEmitter();
  @Input() selectedFilter = {
    unit: [],
    shift: []
  };
  searchOpened = false;
  employmentType: Observable<any>;
  shifts: Observable<any>;
  control: FormControl = new FormControl('');
  subject: Subject<any[]> = new Subject();
  private _filter: {} = {};

  constructor(private _dfcs: DynamicFloatingContentService,
              private _s: DailyViewService,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.employmentType = this._s.getEmploymentTypes().pipe(
      flatMap(e => e),
      filter(e => e.employmentTypeName !== 'Intelypro'),
      map(e => ({
        name: e.employmentTypeName,
        value: e.employmentTypeName
      })),
      toArray()
    );

    this.shifts = this._s.getShifts().pipe(
      flatMap(e => e),
      map(e => ({
        name: e.shiftTime,
        value: e.shiftTime
      })),
      toArray()
    );

    merge(
      this.subject,
      this.control.valueChanges.pipe(flatMap(e => (['q', e])))
    ).pipe(
      map(e => {
        this._filter[e[0]] = e[1];
        return this._filter;
      })
    ).subscribe(e => {

      this.filterChange.emit(e);
    });

  }

  toggle() {
    this.searchOpened = !this.searchOpened;
    this._cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this._cdr.markForCheck();
  }

}
