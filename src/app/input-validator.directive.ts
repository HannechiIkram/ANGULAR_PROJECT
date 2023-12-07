import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appInputValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputValidatorDirective, multi: true }]
})
export class InputValidatorDirective implements Validator {
  @Input('appInputValidator') validationType: 'username' | 'password';

  validate(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    // Validate based on the specified validation type
    switch (this.validationType) {
      case 'username':
        // Validate username (customize the logic as needed)
        const isUsernameValid = /^[a-zA-Z0-9_]+$/.test(value);
        return isUsernameValid ? null : { invalidUsername: true };

      case 'password':
        // Validate password (customize the logic as needed)
        const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        return isPasswordValid ? null : { invalidPassword: true };

      default:
        return null; // No validation for other types
    }
  }
}
