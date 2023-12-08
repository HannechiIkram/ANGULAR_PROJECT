import { Component } from '@angular/core';
import { Universite } from '../models/Universite';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversiteService } from '../service/universite.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-updateuniversite',
  templateUrl: './updateuniversite.component.html',
  styleUrls: ['./updateuniversite.component.scss']
})
export class UpdateuniversiteComponent {
  universite !: Universite ;
  constructor(private fb:FormBuilder,private s:UniversiteService, private ac:ActivatedRoute ,private router: Router){}
  

  ngOnInit() {
    this.s.getUniversiteById(this.ac.snapshot.params['id']).subscribe(
      (data) => {
        this.universite=data;
      
        this.formBuilder.patchValue({
          ...this.universite,
          idUniversite: String(this.universite.idUniversite)
        });
      }
    );

    // Subscribe to form value changes
    }

formBuilder=this.fb.group(
  {
    idUniversite: [''],
    nomUniversite: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}$/)]],
    adress: ['', [Validators.required, Validators.pattern(/\d/)]],
  }
)
update() {
  // Vérifiez si le formulaire est valide avant de déclencher la mise à jour
  if (this.formBuilder.invalid) {
    console.log('Formulaire non valide. Impossible de mettre à jour.');
    return;
  }

  // Si le formulaire est valide, continuez avec la mise à jour
  this.s.updateUniversite(this.formBuilder.value).subscribe(
    () => {
      // Succès
      console.log('Université mise à jour avec succès');
      this.router.navigate(['content/universite']);
    },
    (error) => {
      // Erreur
      console.error('Erreur lors de la mise à jour de l\'université :', error);
    }
  );
}

}






