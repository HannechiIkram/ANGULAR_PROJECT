import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Etudiant } from 'src/app/models/Etudiant';
import { EtudiantService } from 'src/app/service/etudiant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-etudiant',
  templateUrl: './show-etudiant.component.html',
  styleUrls: ['./show-etudiant.component.scss']
})
export class ShowEtudiantComponent {
  dataTablesInstance: any;
  show=false;
  showFormAdd=false;
  etudianttoSelected!:Etudiant;
  constructor(private service:EtudiantService , private etudiantService: EtudiantService,private router: Router){
  }
  Etudiants:Etudiant[]=[];

  itemsPerPageOptions:number[] = [2,4,6]; 
  page = 1;
  itemsPerPage=5;
  ngOnInit(): void {


    this.getEtudiants()
    this.service.getEtudiantList().subscribe(
      (d)=>{
        //console.log(d)
        this.Etudiants=d;

      }
    )

  }
 
  getEtudiants(): void {
    this.etudiantService.getEtudiantList()
    .subscribe(etudiants => {
      this.Etudiants = etudiants;
      console.log('Received etudiants:', etudiants); // Log the received data
    });
  
  }
  getEtudiantsForPage(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.Etudiants.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.page < this.totalPages()) {
      this.page++;
    }
  }
  prevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }
  totalPages(): number {
    return Math.ceil(this.Etudiants.length / this.itemsPerPage);
  }
  changeItemsPerPage(event:Event): void {
    const target = event.target as HTMLSelectElement | null;
    if(target && 'value' in target){
    const value = target.value;
    if(value!== undefined){
    this.itemsPerPage =Number (value);
    this.page = 1; // Retour à la première page lorsque le nombre d'éléments par page est changé
  }
  }
}

  searchTerm: string = '';
  advancedSearch() {
    if (this.searchTerm.length >= 2) {
      // Perform the search based on the first two characters
      const filteredEtudiant = this.Etudiants.filter(Etudiant => {
        const firstTwoChars = Etudiant.nomEt.substring(0, 2).toLowerCase();
        return firstTwoChars.includes(this.searchTerm.toLowerCase());
      });

      // Update the displayed foyers with the filtered results
      this.Etudiants = filteredEtudiant;
    } else {
      // If the search term is less than two characters, reset the foyers to the original data
      this.getEtudiants();
    }
  }
  update(e:Etudiant){
  this.show=true;
    this.etudianttoSelected=e
    const id=this.etudianttoSelected.idEtudiant

    this.router.navigate(['/updateEtudiant/:id', this.etudiantService.updateEtudiant]);
  }

  traitemenet(t:any){
    this.show=!this.show
  }

  changeTab(etu:any){
    this.show=false;
    for(let i=0;i<this.Etudiants.length;i++){
      if(this.Etudiants[i].idEtudiant==etu.id){
        this.Etudiants[i]=etu;
      }
    }
  }
  addEtudiant(){
    this.showFormAdd=true
  }

  addElementToTab(et:any){
    this.Etudiants.push(et)
  }

  deleteEtudiant(id:any): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer ce etudiant ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.etudiantService.removeEtudiant(id).subscribe(
          () => {
            // alert('Deleted Successfully')
            console.log('etudiant deleted successfully');
            
            // Recharger les données DataTables
            if (this.dataTablesInstance) {
              this.dataTablesInstance.ajax.reload(null, false);
           }
           window.location.reload();
         },
         (err)=>{
          let status=err.status;
         /* switch (status){
          case 0:alert('server ') ;break;
          case 401:alert('unauthoriz ') ;break;
          case 404:alert('unauthoriz ') ;break;
          }*/
        }
        );
      }
    });
  }


 // delete(e:Etudiant): void {

   // this.etudiantService.removeEtudiant(e).subscribe(
     //   () => {
       //     console.log('etudiant supprimée avec succès');
           // // Filtrer l"etudiant supprimée du tableau 
         //   this.Etudiant = this.Etudiant.filter((e: Etudiant) => e.id !== e.id);
        //},
        //error => {
          //  console.error('Erreur lors de la suppression de l"etudiant :', error);
        //}
    //);

//}


navigateToUpdate(id: number): void {
  this.router.navigate(['/content/updateEtudiant/',id]);
}
navigateToUadd(): void {
  this.router.navigate(['/content/addEtudiant']);
}


//navigateToStudent(studentId: number): void {
 // if (studentId !== undefined && studentId !== null) {
  //  this.router.navigate(['/update', studentId]); // Remplacez '/students' par votre chemin approprié
 // } else {
    //console.error('L\'ID de l\'étudiant est invalide.');
    // Gestion des cas où l'ID est invalide ou non défini
  ///}
//}

navigateToDetail(Id: number) {
  this.router.navigate(['/details',Id]);
}


}
