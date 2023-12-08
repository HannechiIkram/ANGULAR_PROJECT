import { Component } from '@angular/core';
import { Chambre } from 'src/app/models/chambre';
import { ChambreService } from 'src/app/service/chambre.service';

@Component({
  selector: 'app-show-chambre',
  templateUrl: './show-chambre.component.html',
  styleUrls: ['./show-chambre.component.scss']
})
export class ShowChambreComponent {
chambres: Chambre[]; // Change the type to match your Universite model.

  constructor(
    private chambreService: ChambreService) {}

  ngOnInit() {
    this.getAllChambres();
  }
  refresh() {
    this.getAllChambres();
  }

  getAllChambres() {
    this.chambreService.getAllChambres().subscribe(
      (data: any) => {
        this.chambres = data; 
        console.log(this.chambres)
        // Assuming your service returns an array of Universite objects.
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );
  }

 


deleete(idChambre: number): void {
  const confirmDelete = confirm('Are you sure you want to delete this university?');

  if (confirmDelete) {
    this.chambreService.deleteChambre(idChambre).subscribe(
      (res: any) => {
        console.log('Delete successful:', res);
        this.refresh();
      },
      (error) => {
        console.error('Error deleting Universite: ', error);
      }
    );
  }
}



}
