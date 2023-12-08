import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoyerService } from 'src/app/service/foyer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatefoyer',
  templateUrl: './updatefoyer.component.html',
  styleUrls: ['./updatefoyer.component.scss']
})
export class UpdatefoyerComponent {
  isButtonDisabled = true;
  foyer!:any;
  originalFormValues: any;
  constructor(private fb:FormBuilder,private s:FoyerService, private ac:ActivatedRoute,private router: Router){}
  

  ngOnInit() {
    this.s.getFoyerById(this.ac.snapshot.params['id']).subscribe(
      (data) => {
        this.foyer=data;
        this.originalFormValues = { ...data }; // Make a copy of the original values
        this.formBuilder.patchValue(this.foyer);
      }
    );

    // Subscribe to form value changes
    this.formBuilder.valueChanges.subscribe(() => {
      this.updateButtonState();
    });
  }

formBuilder=this.fb.group(
  {
    idFoyer: [''],
    nomFoyer: ['', Validators.required],
    capaciteFoyer: ['', [Validators.required, this.capaciteRangeValidator]],
  }
)

navigateToShowFoyer() {
  this.router.navigate(['/foyer']);
}




updateButtonState() {
  const isFormDirty = this.formBuilder.dirty;
  const isFormValid = this.formBuilder.valid;
  const hasFormChanged = !this.areObjectsEqual(this.formBuilder.value, this.originalFormValues);
  this.isButtonDisabled = !isFormDirty || !isFormValid || !hasFormChanged;
}
areObjectsEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}



update() {
  if (this.isButtonDisabled) {
    return;
  }
  Swal.fire({
    title: 'Es-tu sûr?',
    text: 'Vous ne pourrez pas revenir en arrière !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, changez le statut !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.s.updateFoyer(this.formBuilder.value).subscribe(
        () => {
          Swal.fire({
            title: 'Modification effectuée!',
            text: 'Les détails du foyer ont été modifiés avec succès.',
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/foyer']);
          });
        },
        (error) => {
          console.error('Error updating foyer:', error);
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la modification du foyer.',
            icon: 'error'
          });
        }
      );
    }
  });
}




capaciteRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;

  if (value !== null && (value < 0 || value > 10)) {
    return { 'capaciteRange': true };
  }

  return null;
}

isUpdateButtonDisabled(): boolean {
  const capaciteFoyerControl = this.formBuilder.get('capaciteFoyer');
  return this.formBuilder.invalid || (capaciteFoyerControl?.hasError('capaciteRange') ?? false);
}




 }

