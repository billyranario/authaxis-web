import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Pipe({
  name: 'fieldValidator',
})
export class FieldValidatorPipe implements PipeTransform {
  transform(abstractControl: AbstractControl | null): string | null | any {
    const control = abstractControl as FormControl;

    if (control?.invalid && control?.errors) {
      if (control.hasError('required')) {
        return 'This field is required';
      } else if (control.hasError('email')) {
        return 'Invalid email format';
      } else if (control.hasError('min')) {
        return `The field value must be greater than or equal to ${control.errors['min']?.min}`;
      } else if (control.hasError('max')) {
        return `The field value must be less than or equal to ${control.errors['max']?.max}`;
      } else if (control.hasError('invalidJSON')) {
        return `Invalid JSON format`;
      } else if (control.hasError('passwordMismatch')) {
        return `Mismatched Passwords`;
      }
    }
    return null;
  }
}
