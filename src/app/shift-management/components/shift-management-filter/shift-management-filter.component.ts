import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {DynamicFloatingContentService} from '../../../shared/services/dynamic-floating-content.service';
import {Observable, Subject} from 'rxjs';
import {DailyViewService} from '../../../services/daily-view.service';
import {filter, flatMap, map, toArray} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {SelectableButtonGroupComponent} from '../../../shared/componets/selectable-button-group/selectable-button-group.component';

@Component({
  selector: 'shift-management-filter',
  templateUrl: './shift-management-filter.component.html',
  styleUrls: ['./shift-management-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftManagementFilterComponent implements OnInit, AfterViewInit {

  @Output() filterChange: EventEmitter<{}> = new EventEmitter();
  @Output() searchChange: EventEmitter<{}> = new EventEmitter();
  @Output() blur: EventEmitter<{}> = new EventEmitter();
  @Output() focus: EventEmitter<{}> = new EventEmitter();
  @Input() selectedFilter = {};
  @ViewChild('shiftsOptions') shiftsOptions: SelectableButtonGroupComponent;
  @ViewChild('employmentTypeOptions') employmentTypeOptions: SelectableButtonGroupComponent;
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

  private static _employmentTypeToFilterFormat(e: any) {
    return {
      name: e.employmentTypeName,
      value: e.employmentTypeName
    };
  }

  private static _shiftTimeToFilterFormat(e: any) {
    return {
      name: e.shiftTime,
      value: e.shiftTime
    };
  }

  ngOnInit() {
    this.employmentType = this._s.getEmploymentTypes().pipe(
      flatMap(e => e),
      filter(e => e.employmentTypeName !== 'Intelypro'),
      map(ShiftManagementFilterComponent._employmentTypeToFilterFormat),
      toArray()
    );

    this.shifts = this._s.getShifts().pipe(
      flatMap(e => e),
      map(ShiftManagementFilterComponent._shiftTimeToFilterFormat),
      toArray()
    );

    this.subject.pipe(map(e => this._setFilterOption(e))).subscribe(e => this.filterChange.emit(e));
    this.control.valueChanges.subscribe(e => this.searchChange.next(e));
  }

  toggle() {
    this.searchOpened = !this.searchOpened;
    this._cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this._cdr.markForCheck();
  }

  forceSetFilters(newValues, pushEvent?: boolean) {
    this.selectedFilter = newValues;
    this.shiftsOptions.forceSetSelected(newValues.shift, pushEvent);
    this.employmentTypeOptions.forceSetSelected(newValues.employmentType, pushEvent);
    this._cdr.markForCheck();
  }

  private _setFilterOption(e: any) {
    this._filter[e[0]] = e[1];
    return this._filter;
  }

}
