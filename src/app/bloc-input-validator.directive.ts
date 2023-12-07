import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appBlocInputValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: BlocInputValidatorDirective, multi: true }]
})
export class BlocInputValidatorDirective implements Validator {
  @Input('appBlocInputValidator') submitted: boolean;

  validate(formGroup: FormGroup): ValidationErrors | null {
    if (!this.submitted) {
      return null; // Skip validation if the form has not been submitted
    }

    const nomBlocControl = formGroup.get('nomBloc');
    const capaciteBlocControl = formGroup.get('capaciteBloc');

    if (!nomBlocControl || !capaciteBlocControl) {
      return null; // Validation cannot be performed without controls
    }

    const nomBlocValue: string = nomBlocControl.value;
    const capaciteBlocValue: string = capaciteBlocControl.value;

    // Validate "Nom Bloc" (customize the logic as needed)
    const isNomBlocValid = /^[a-zA-Z0-9\s]+$/.test(nomBlocValue);

    // Validate "Capacite Bloc" (customize the logic as needed)
    const isCapaciteBlocValid = /^\d+$/.test(capaciteBlocValue);

    // Check if any validation failed and return an error object
    if (!isNomBlocValid || !isCapaciteBlocValid) {
      return { invalidForm: true };
    }

    // Return null if all validations passed
    return null;
  }
}
