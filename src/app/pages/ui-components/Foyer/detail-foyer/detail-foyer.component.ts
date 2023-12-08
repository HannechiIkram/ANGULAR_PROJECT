import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/service/foyer.service';


@Component({
  selector: 'app-detail-foyer',
  templateUrl: './detail-foyer.component.html',
  styleUrls: ['./detail-foyer.component.scss']
})
export class DetailFoyerComponent implements OnInit {

  foyer: Foyer | undefined;

  constructor(private foyerService: FoyerService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const foyerId = this.route.snapshot.params['id'];
    this.foyerService.getFoyerById(foyerId).subscribe(
      (data) => {
        this.foyer = data;
  
        // Check and parse createdAt and updatedAt to Date objects
        if (this.foyer) {
          this.foyer.createdAt = this.parseDate(this.foyer.createdAt) || new Date(); // Use a default date if parsing returns null
          this.foyer.updatedAt = this.parseDate(this.foyer.updatedAt) || new Date(); // Use a default date if parsing returns null
  
          // console.log(this.foyer);
        }
      },
      (error) => {
        console.error('Error fetching foyer details:', error);
      }
    );
  }
  
  private parseDate(dateString: any): Date | null {
    const parsedDate = new Date(dateString);
  
    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    } else {
      console.error('Invalid date format:', dateString);
      return null;
    }
  }
  
  
  formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
  
  

  downloadPDF() {
    if (this.foyer) {
      const pdf = new jsPDF();
      const pdfContent = `
        Foyer Name: ${this.foyer.nomFoyer}
        Capacity: ${this.foyer.capaciteFoyer}
        Created At: ${this.formatDate(this.foyer.createdAt)}
        Updated At: ${this.formatDate(this.foyer.updatedAt)}
        Université: ${this.foyer.universite?.nomUniversite || 'N/A'}
      `;
      pdf.text(pdfContent, 10, 10);
      pdf.save('foyer-details.pdf');
    } else {
      console.error('Foyer details not available for PDF generation.');
    }
  }


  downloadExcel() {
    if (this.foyer) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{
        'Foyer Name': this.foyer.nomFoyer,
        'Capacity': this.foyer.capaciteFoyer,
        'Created At': this.formatDate(this.foyer.createdAt),
        'Updated At': this.formatDate(this.foyer.updatedAt),
        'Université': this.foyer.universite?.nomUniversite || 'N/A'
      }]);
  
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'foyer-details');
    } else {
      console.error('Foyer details not available for Excel export.');
    }
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = `${fileName}.xlsx`;
    link.click();
  }
 
  navigateToShowFoyer() {
    this.router.navigate(['/foyer']);
  }
  


  desaffecterBlocs(idFoyer: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unassign the blocks!',
      cancelButtonText:  'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.foyerService.desaffecterBlocs(idFoyer).subscribe(
          () => {
            
            Swal.fire({
              title: 'Blocks unassigned!',
              text: 'The blocks have been successfully unassigned.',
              icon: 'success'
            }).then(() => {
              // Optionally, you can reload the data or update the UI here.
            });
          },
          (error) => {
            console.error('Error unassigning blocks:', error);
            // Handle error, e.g., show an error message or perform error-specific actions
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while unassigning the blocks.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
}
