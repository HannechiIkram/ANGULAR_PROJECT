import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from 'src/app/models/Facture';
import { FactureService } from 'src/app/service/facture.service';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})
export class AddFactureComponent {
  @Input() factures: Facture;
  @Output() submitFacture = new EventEmitter<Facture>();
  factureForm: FormGroup;
  facture: Facture = {
    idFacture: 0, 
    description: '',
    paid: false,
    prix: 0,
    quantity: 0,
    customerName: ''
  };
  constructor(private formBuilder: FormBuilder,private serviceFacture: FactureService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const factureId = params['factureId'];
      if (factureId) {
        this.serviceFacture.getFactureByID(factureId).subscribe(
          (facture: any) => {
            this.facture = facture;
        
          },
          (error:any) => {
            console.error('Failed to fetch reservation data', error);
          }
        );
      }else{
        this.initForm();
      }
    });
  }
  /*******Test */
  initForm() {
    this.factureForm = this.formBuilder.group({
      description: ['', Validators.required],
      paid: [false],
      prix: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      customerName: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitFacture.emit(this.facture);
    this.serviceFacture.addFacture(this.facture).subscribe(
      (d) => {
        console.log(d);
        this.router.navigate(['/ui-components/facture']);
      }
    );
  }
}
