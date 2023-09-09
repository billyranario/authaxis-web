import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[codeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CodeValidatorDirective),
      multi: true,
    },
  ],
})
export class CodeValidatorDirective implements Validator {
  validate(control: AbstractControl) {
    try {
      JSON.parse(control.value);
      return null;
    } catch (e) {
      return { jsonInvalid: true };
    }
  }
}
