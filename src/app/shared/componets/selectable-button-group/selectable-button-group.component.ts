import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {CustomFormGroupValidators} from '../../../helpers/custom-validators/CustomFormGroupValidators';

@Component({
  selector: 'app-selectable-button-group',
  templateUrl: './selectable-button-group.component.html',
  styleUrls: ['./selectable-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableButtonGroupComponent implements OnInit {

  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() elements: { name: string, value: string }[];
  @Input() selectedFilters = [];
  @Input() multiple = false;
  @Input() maximumSelections = 0;

  control: FormControl = new FormControl([]);
  selected: string[] = [];
  hasDefaultVal: boolean;
  private _oldValue;

  constructor() {
  }

  ngOnInit(): void {

    if (this.selectedFilters) {
      this.selected = this.selectedFilters;
      this.hasDefaultVal = true;
    }

    this.control.setValidators(CustomFormGroupValidators.MinimumCheckboxesChecked(this.maximumSelections));

    this.control.valueChanges.pipe(
      map(value => this._removeIfRequiredNotMultiple(value)),
      tap(e => this.selected = e)
    ).subscribe(e => this.valueChange.next(e));
  }

  private _removeIfRequiredNotMultiple(value: string[]) {

    if (!this.multiple) {

      if (value.length === 1 && this.hasDefaultVal) {
        this._oldValue = value[0];
        this.hasDefaultVal = false;
      }

      if (value.length > 1) {
        value.splice(value.indexOf(this._oldValue), 1);
        this.control.setValue(value, {emitEvent: false});
      }
      this._oldValue = value[0];
    }

    if (value.length === 1 && this.hasDefaultVal) {
      this.selectedFilters.forEach(index => {
        if (value.find(function (element) {
          return element === index;
        })) {
          value.splice(value.indexOf(index), 1);
        } else {
          value.push(index);
        }
      });

      this.control.setValue(value, {emitEvent: false});
      this.hasDefaultVal = false;
    }

    return value;
  }
}
