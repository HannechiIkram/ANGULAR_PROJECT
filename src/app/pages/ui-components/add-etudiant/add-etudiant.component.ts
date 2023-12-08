import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from 'src/app/service/etudiant.service';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.scss']
})
export class AddEtudiantComponent {
  constructor(private etudiantService:EtudiantService,private router:Router){

  }
  etudiant: any = {}; 

  showForm(f:any){
    console.log(f)
  }

 /* goBack(): void {
    this.location.back();
  }
*/
  saveEtudiant(e:any){

    this.etudiantService.addEtudiant(e).subscribe(
      ()=>{
        this.router.navigate(['content/ShowEtudiant'])
       
        console.log(e);
      },
    (er)=>{
        console.log(er)
    }
    );
  }
}
