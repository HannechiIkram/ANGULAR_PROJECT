import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Facture } from 'src/app/models/Facture';
import { FactureService } from 'src/app/service/facture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent {
  @Input() facturess: Facture[] = [];
  @Output() addFactureClick = new EventEmitter<void>();
  @Output() editFactureClick = new EventEmitter<number>();
  @Output() deleteFactureClick = new EventEmitter<number>();
  factures: Facture[] = []; 
  constructor(private servicefacture: FactureService,private router: Router) {}

  ngOnInit() {
  this.loadFacture();
  }

  onAddClick() {
    this.router.navigate(['/ui-components/add-facture'])
    this.addFactureClick.emit();
  }

  onEditClick(id: number) {
    this.router.navigate(['/ui-components/add-facture', { factureId: id }]);
    this.editFactureClick.emit(id);
  }
  loadFacture() {
    this.servicefacture.getAllFactures().subscribe(
      (data: Facture[]) => {
        this.factures = data;
      },
      (error: any) => {
        console.error('Error fetching Factures:', error);
      }
    );
  }
////
searchTerm:String=""
advancedSearch() {
  if (this.searchTerm.length >= 2) {
    // Perform the search based on the first two characters
    const filteredFoyers = this.factures.filter(facture => {
      const firstTwoChars = facture.customerName.substring(0, 2).toLowerCase();
      return firstTwoChars.includes(this.searchTerm.toLowerCase());
    });

    // Update the displayed foyers with the filtered results
    this.factures = filteredFoyers;
  } else {
    // If the search term is less than two characters, reset the foyers to the original data
    this.loadFacture();
  }
}

goToDetailFacture(id: number) {
  this.router.navigate(['/ui-components/detailFacture', id]);
}


////////  Mohamed Amine Derouiche
  /////////////
onDeleteClick(id: number) {
  this.deleteFactureClick.emit(id);
  Swal.fire({
    title: 'Es-tu sûr?',
    text: 'Voulez-vous vraiment supprimer cette facture?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.servicefacture.deleteFacture(id).subscribe(
        () => {
          Swal.fire({
            title: 'Facture supprimée!',
            text: 'La facture a été supprimée avec succès.',
            icon: 'success'
          }).then(() => {
            console.log('Facture deleted successfully.');
            this.loadFacture();
          });
        },
        (error: any) => {
          console.error('Error deleting Facture:', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de la suppression de la facture.',
            icon: 'error'
          });
        }
      );
    }
  });
}

}
