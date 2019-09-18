import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomFormGroupValidators {

  public static MinimumCheckboxesChecked(minimum: number): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const anyChecked = form.value.length >= minimum;
      return anyChecked ? null : {
        'no-element-checked': true
      };
    };
  }

}
