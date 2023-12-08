import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/models/Etudiant';
import { EtudiantService } from 'src/app/service/etudiant.service';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.scss']
})
export class UpdateEtudiantComponent {
  etudiant: Etudiant;
  updateForm: FormGroup; // Renommage de la variable formBuilder en updateForm

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Création du formulaire avec les champs et les validateurs requis
    this.updateForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      cin: ['', Validators.required],
      ecole: ['', Validators.required],
      dateNaissance: ['', Validators.required]
    });

    // Récupération de l'étudiant à partir de l'ID de la route
    this.etudiantService.getEtudiantById(this.route.snapshot.params['id']).subscribe((data: Etudiant) => {
      this.etudiant = data;
      this.updateForm.patchValue(this.etudiant); // Remplir le formulaire avec les données de l'étudiant
    });
  }


 /* goBack(): void {
    this.location.back();
  }
*/

  updateEtudiant() {
    this.etudiantService.updateEtudiant(this.updateForm.value).subscribe(
      () => {
        console.log('Etudiant updated successfully:');
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error updating etudiant:', error);
      }
    );
  }
}
