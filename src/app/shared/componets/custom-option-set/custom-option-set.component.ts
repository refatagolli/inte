import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CustomFormGroupValidators} from '../../../helpers/custom-validators/CustomFormGroupValidators';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-custom-option-set',
  templateUrl: './custom-option-set.component.html',
  styleUrls: ['./custom-option-set.component.scss']
})
export class CustomOptionSetComponent implements OnInit {

  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() elements: { name: string, value: string }[];
  @Input() selectedCheckBox = [];
  @Input() selectedRadioButton = 0;
  @Input() multiple = false;
  @Input() required = true;
  @Input() maximumSelections = 0;

  control: FormControl = new FormControl([]);
  checkboxSelected: string[] = [];
  radioSelected: number;

  constructor() { }

  ngOnInit() {

    if (this.selectedCheckBox && this.multiple) {
      this.selectedCheckBox.forEach(item => {
        this.checkboxSelected.push(item);
      });
    } else if (this.selectedRadioButton !== 0 && !this.multiple) {
      this.radioSelected = this.selectedRadioButton;
    }
  }

  updateCheckedOptions(option) {
    let found = false;
    this.checkboxSelected.forEach(item => {
      if (item === option.value) {
        this.checkboxSelected.splice(this.checkboxSelected.indexOf(item), 1);
        found = true;
      }
    });

    if (!found) {
      this.checkboxSelected.push(option.value);
    }

    this.valueChange.next(this.checkboxSelected);
  }

  updateRadioOptions(option) {
    if (!this.required && (this.radioSelected === option.value)) {
      this.radioSelected = 0;
    } else {
      this.radioSelected = option.value;
    }

    this.valueChange.next(this.radioSelected);
  }
}
