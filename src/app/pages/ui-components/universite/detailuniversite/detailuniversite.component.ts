import { Component } from '@angular/core';
import { Universite } from '../models/Universite';
import { UniversiteService } from '../service/universite.service';
import { ActivatedRoute, Router } from '@angular/router';
import  jsPDF from 'jspdf';





@Component({
  selector: 'app-detailuniversite',
  templateUrl: './detailuniversite.component.html',
  styleUrls: ['./detailuniversite.component.scss']
})
export class DetailuniversiteComponent {
  selectedUniversite: any;
 

 

  universite!: Universite ;

  constructor(private Universiteservice: UniversiteService, private route: ActivatedRoute, private router: Router) {}



  ngOnInit() {
    const Id = this.route.snapshot.params['id'];
    this.Universiteservice.getUniversiteById(Id).subscribe(
      (data) => {
        this.universite = data;
  
        // Check and parse createdAt and updatedAt to Date objects
     
      },
      (error) => {
        console.error('Error fetching foyer details:', error);
      }
    );
  }
  goBack() { this.router.navigate(['content/universite']);


}



downloadPdf() {
  // Create a new instance of jsPDF
  const pdf = new jsPDF();

  // Add content to the PDF
  pdf.text('University Details', 10, 10);
  pdf.text(`University Name: ${this.universite.nomUniversite}`, 10, 20);
  pdf.text(`Address: ${this.universite.adress}`, 10, 30);

  // Save the PDF with a specific name
  pdf.save('UniversityDetails.pdf');
}

}
