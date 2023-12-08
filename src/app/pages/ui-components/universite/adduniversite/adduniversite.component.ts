import { Component } from '@angular/core';
import { Universite } from '../models/Universite';
import { UniversiteService } from '../service/universite.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduniversite',
  templateUrl: './adduniversite.component.html',
  styleUrls: ['./adduniversite.component.scss']
})
export class AdduniversiteComponent {
  universite: Universite = {
    idUniversite: 0,
    nomUniversite: '',
    adress: '',
   
};

constructor(private universiteService: UniversiteService, private http :HttpClient,private router: Router) {}

selectedFile: File | null = null;

onFileSelected(event: any) {
this.selectedFile = event.target.files[0];
console.log(this.selectedFile);
}


saveUniversite() {


this.universiteService.addUniversite(this.universite).subscribe(
  () => {


    this.router.navigate(['content/universite']);
    
    // alert('added');
  },
  (error) => {
    console.error('Error adding unversite:', error);
  }
);
}


}
