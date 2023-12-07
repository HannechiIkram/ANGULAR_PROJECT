import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';

import * as XLSX from 'xlsx';
import { Bloc } from '../models/bloc';
import { BlocService } from '../bloc.service';

@Component({
  selector: 'app-detail-bloc',
  templateUrl: './detail-bloc.component.html',
  styleUrls: ['./detail-bloc.component.scss']
})
export class DetailBlocComponent implements OnInit {
  
  bloc: Bloc | undefined;

  constructor(private blocService: BlocService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const blocId = this.route.snapshot.params['id'];
    this.blocService.fetchBlocById(blocId).subscribe(
      (data) => {
        this.bloc = data;

        // Check and parse createdAt and updatedAt to Date objects
      },
      (error) => {
        console.error('Error fetching bloc details:', error);
      }
    );
  }



  downloadPDF() {
    if (this.bloc) {
      const pdf = new jsPDF();
      const pdfContent = `
        Bloc Name: ${this.bloc.nomBloc}
        Capacity: ${this.bloc.capaciteBloc}
      `;
      pdf.text(pdfContent, 10, 10);
      pdf.save('bloc-details.pdf');
    } else {
      console.error('Bloc details not available for PDF generation.');
    }
  }

  downloadExcel() {
    if (this.bloc) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([{
        'Bloc Name': this.bloc.nomBloc,
        'Capacity': this.bloc.capaciteBloc,
      }]);

      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'bloc-details');
    } else {
      console.error('Bloc details not available for Excel export.');
    }
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = `${fileName}.xlsx`;
    link.click();
  }

  navigateToShowBloc() {
    this.router.navigate(['/bloc']);
  }
}
