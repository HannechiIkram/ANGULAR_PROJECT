import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddFoyerComponent } from '../add-foyer/add-foyer.component';
import { UpdateFoyerInputComponent } from '../update-foyer-input/update-foyer-input.component';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/service/foyer.service';

@Component({
  selector: 'app-show-foyer',
  templateUrl: './show-foyer.component.html',
  styleUrls: ['./show-foyer.component.scss']
})
export class ShowFoyerComponent { 
  show = false;
  foyers: Foyer[] = [];
  searchTerm: string = '';

  selectedFoyerId: number | null = null;

  pageSize = 5;
  currentPage = 1;
  totalFoyers = 0;
  foyerToUpdate:Foyer

constructor(private foyerService: FoyerService,private router: Router, private ac: ActivatedRoute
  ,public dialog:MatDialog){}
  ngOnInit(): void {
    
    this.ShowFoyers();
 
  }
 
  ShowFoyers() {
    this.foyerService.getAllFoyers().subscribe(
      (data: any) => {
        this.totalFoyers = data.length;
        this.foyers = data;
      },
      (error: any) => {
        console.log('Error fetching foyers:', error);
      }
    );
  }

  getCurrentPageFoyers(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.foyers.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalFoyers / this.pageSize);
  }

  //********************************************* */
  
  advancedSearch() {
    if (this.searchTerm.length >= 2) {
      // Perform the search based on the first two characters
      const filteredFoyers = this.foyers.filter(foyer => {
        const firstTwoChars = foyer.nomFoyer.substring(0, 2).toLowerCase();
        return firstTwoChars.includes(this.searchTerm.toLowerCase());
      });

      // Update the displayed foyers with the filtered results
      this.foyers = filteredFoyers;
    } else {
      // If the search term is less than two characters, reset the foyers to the original data
      this.ShowFoyers();
    }
  }
 
  
  /*********************************** */
  navigateToAddFoyer() {
    this.router.navigate(['/foyer/add']);
  }


  navigateToDetailFoyer(fId: number) {
    this.router.navigate(['foyer/detail', fId]);
  }
  navigateToUpdateFoyer(fId: number) {
    this.router.navigate(['foyer/update',fId]);
  }
  changestatus(foyer:Foyer){
   foyer.etat=false;
   this.foyerService.updateEtatFoyer(foyer).subscribe(data=>{
        alert("Status changed successfully");
  }
   )}
  // delete(id:any){
  //   this.foyerService.deleteFoyerById(id).subscribe(
  //     ()=>{
  //     alert('next')
  //     window.location.reload();
  //     },
  //     (err)=>{
  //     let status=err.status;
  //     switch (status){
  //     case 0:alert('server ') ;break;
  //     case 401:alert('unauthoriz ') ;break;
  //     case 404:alert('unauthoriz ') ;break;
  //     }
  //     },
  //     );
  //     }

      j = -1
      detailFoyer(index: any) {
        
        if (this.j === index) {
          this.show = !this.show;
        } else {
          this.j = index;
          this.show = true;
        }
      }

       foyer!:Foyer;
      searchFoyers(nom: string): void {
        this.foyerService.searchFoyersByNomFoyerOrUniversite(nom).subscribe(
          (data) => {
            
            this.foyer=data;
            console.log('Foyer:', data);
          },
          (error) => {
            
            console.error('Error:', error);
          }
        );
      }
      changestatus1(foyer: Foyer): void {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel' 
        }).then((result) => {
          if (result.isConfirmed) {
            foyer.etat = false;
      
            this.foyerService.updateEtatFoyer(foyer).subscribe(() => {
              Swal.fire({
                title: 'Deleted!',
                text: 'The Foyer has been deleted successfully.',
                icon: 'success'
              }).then(() => {
                
              });
            });
          }
        });
      }
      openDialog() {
        const dialogRef = this.dialog.open(AddFoyerComponent, {
          width: '550px',
          height: '600px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        });
      }
      
      

      // AjouterExcel() {
      //   const dataForExcel = this.foyer.map((f) => {
      //     return {
      //       'Nom de foyer': f.nomFoyer,
      //       'Capacite de foyer': f.capaciteFoyer,
      //       'Nom d\'universite': f.universite ? f.universite.nomUniversite : 'Non affecté',
      //     };
      //   });
      
      //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExcel);
      
      //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //   XLSX.utils.book_append_sheet(wb, ws, 'Foyer_Data');
      
      //   /* generate XLSX file and trigger a download */
      //   XLSX.writeFile(wb, 'foyer_data.xlsx');
      // }
      

      desaffecterBlocs(idFoyer: number): void {
        Swal.fire({
          title: 'Es-tu sûr?',
          text: 'Vous ne pourrez pas revenir en arrière !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, désaffecter les blocs !',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.foyerService.desaffecterBlocs(idFoyer).subscribe(
              () => {
                 this.foyer.blocs.splice(0, this.foyer.blocs.length);
                Swal.fire({
                  title: 'Blocs désaffectés!',
                  text: 'Les blocs ont été désaffectés avec succès.',
                  icon: 'success'
                }).then(() => {
                  // Optionally, you can reload the data or update the UI here.
                });
              },
              (error) => {
                console.error('Error desaffecting blocs:', error);
                // Handle error, e.g., show an error message or perform error-specific actions
                Swal.fire({
                  title: 'Erreur',
                  text: 'Une erreur s\'est produite lors de la désaffectation des blocs.',
                  icon: 'error'
                });
              }
            );
          }
        });
      }
      update(foyer:any){
        console.log(foyer)
        this.show=true
        this.foyerToUpdate=foyer
        console.log(this.foyerToUpdate)
        
    
      }
    
      traitement(t:any){
        this.show=!this.show
      }
      changeTab(e:any){
        this.show=false;
        for(let i=0;i<this.foyers.length;i++){
          if(this.foyers[i].idFoyer==e.idBloc){
            this.foyers[i]=e;
          }
        }
      }
     
    
      
      openDialog1() {
        const dialogRef = this.dialog.open(UpdateFoyerInputComponent, {
          width: '550px',
          height: '600px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        });
      }
}
