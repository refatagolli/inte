import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DailyViewService} from '../../../services/daily-view.service';
import {tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {CustomFormGroupValidators} from '../../../helpers/custom-validators/CustomFormGroupValidators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-change-unit',
  templateUrl: './change-unit.component.html',
  styleUrls: ['./change-unit.component.scss']
})
export class ChangeUnitComponent implements OnInit {

  @Output() unitMoved: EventEmitter<any> = new EventEmitter();
  public elements: Observable<any>;
  public unitToMove: FormControl = new FormControl([], CustomFormGroupValidators.MinimumCheckboxesChecked(1));
  private _oldValue: string;

  constructor(private _dailyViewService: DailyViewService) {
  }

  ngOnInit() {
    this.elements = this._dailyViewService.getUnits();

    this.unitToMove.valueChanges.pipe(
      tap(e => this._removeIfMoreThenOne(e)),
    ).subscribe(e => console.log(e));
  }

  public moveToUnit() {
    alert(`unit moved to ${this.unitToMove.value}`);
    this.unitMoved.next();
  }

  private _removeIfMoreThenOne(value: string[]) {
    if (value.length > 1) {
      value.splice(value.indexOf(this._oldValue), 1);
      this.unitToMove.setValue(value);
    }
    this._oldValue = value[0];
  }
}
