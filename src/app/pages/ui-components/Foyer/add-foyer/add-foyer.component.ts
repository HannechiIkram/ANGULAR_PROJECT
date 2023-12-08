import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/service/foyer.service';
import { Universite } from '../../universite/models/Universite';

@Component({
  selector: 'app-add-foyer',
  templateUrl: './add-foyer.component.html',
  styleUrls: ['./add-foyer.component.scss']
})
export class AddFoyerComponent {

  ngOnInit(): void {
    this.ajoute()


   // this.foyerForm.controls['foyerCapacity'].setValidators(this.validateFoyerCapacity);
    
  }
  
  foyer!: Foyer;
  availableNames: string[] = ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan",
  "Kasserine", "Kébili", "Kef", "Mahdia", "Manouba","Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
  "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"]; 
  selectedName!: string;

  constructor(private foyerservice: FoyerService, private router: Router,foyer: Foyer,public dialogRef: MatDialogRef<AddFoyerComponent>) {
     this.foyer=foyer;
  }
  selectuniversite!: string;
universities!: Universite[];

ajoute(): void {
  this.foyerservice.findAllUniversite().subscribe(data => {
    this.universities = data;
    console.log(this.universities)
  });
}

navigateToShowFoyer() {
  this.router.navigate(['/foyer']);
}

saveFoyer() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to save the foyer?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, save it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedUniversityId = this.selectuniversite;

      this.foyerservice.addFoyerSelonEtat(this.foyer, this.selectedName, this.selectuniversite).subscribe(
        () => {
          Swal.fire({
            title: 'Foyer saved!',
            text: 'The foyer has been saved successfully.',
            icon: 'success'
          }).then(() => {
            this.dialogRef.close();
          });
        },
        (error) => {
          console.error('Error adding foyer:', error);
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while saving the foyer.',
            icon: 'error'
          });
        }
      );
    }
  });
}

onCancel(): void {
  this.dialogRef.close();
}




validateFoyerCapacity(control: AbstractControl): { [key: string]: boolean } | null {
  const capacity = control.value;

  if (capacity > 0 && capacity <= 10) {
    return null; // La validation réussit
  } else {
    return { 'invalidCapacity': true }; // La validation échoue
  }
}
  }
  


