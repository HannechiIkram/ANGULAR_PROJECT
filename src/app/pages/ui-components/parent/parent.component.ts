import { Component } from '@angular/core';
import { Facture } from 'src/app/models/Facture';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  factures: Facture[] = [];
  facture: Facture = {
    idFacture: 0,
    description: '',
    paid: false,
    prix: 0,
    quantity: 0,
    customerName: '',
  };

  onAddFactureClick() {
  }

  onEditFactureClick(id: number) {
  }

  onDeleteFactureClick(id: number) {
  }

  onSubmitFacture(facture: Facture) {
  }
}
