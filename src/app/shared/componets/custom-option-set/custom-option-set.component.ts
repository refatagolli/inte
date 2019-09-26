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
  @Input() maximumSelections = 0;

  control: FormControl = new FormControl([]);
  checkboxSelected: string[] = [];
  radioSelected: number;

  constructor() { }

  ngOnInit() {

    if (this.selectedCheckBox && this.multiple) {
      this.checkboxSelected = this.selectedCheckBox;
    } else if (this.selectedRadioButton !== 0 && !this.multiple) {
      this.radioSelected = this.selectedRadioButton;
    }
  }

  updateCheckedOptions(option, event) {
      if (event.target.checked) {
        this.checkboxSelected.push(option.value);
      } else {
        this.elements.forEach(item => {
          if (item.value === option.value) {
            this.checkboxSelected.splice(this.checkboxSelected.indexOf(item.value), 1);
          }
        });
      }

      this.valueChange.next(this.checkboxSelected);
  }

  updateRadioOptions(option) {
    this.radioSelected = option.value;
    this.valueChange.next(option.value);
  }
}
