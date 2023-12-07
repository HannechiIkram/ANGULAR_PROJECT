import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from 'src/app/models/Facture';
import { FactureService } from 'src/app/service/facture.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.scss']
})
export class DetailFactureComponent {

  facture!: Facture; 

  constructor(private factureService: FactureService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const factureId = this.route.snapshot.params['id'];
    this.factureService.getFactureByID(factureId).subscribe(
      (data: Facture) => { 
        this.facture = data;
      }
    );
  }


  downloadPDF() {
    const doc = new jsPDF();
    doc.text(`ID Facture: ${this.facture.idFacture}`, 10, 10);
    doc.text(`Description: ${this.facture.description}`, 10, 20);
    doc.text(`Paid: ${this.facture.paid ? 'Yes' : 'No'}`, 10, 30);
    doc.text(`Prix: ${this.facture.prix}`, 10, 40);
    doc.text(`Quantity: ${this.facture.quantity}`, 10, 50);
    doc.text(`Customer Name: ${this.facture.customerName}`, 10, 60);

    // Enregistrement du fichier PDF avec le nom de la facture
    doc.save(`Facture_${this.facture.idFacture}.pdf`);
  }

}
