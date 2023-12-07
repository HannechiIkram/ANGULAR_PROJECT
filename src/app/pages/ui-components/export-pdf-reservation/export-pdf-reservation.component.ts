import { Component } from '@angular/core';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-export-pdf-reservation',
  templateUrl: './export-pdf-reservation.component.html',
  styleUrls: ['./export-pdf-reservation.component.scss']
})
export class ExportPdfReservationComponent {
  constructor(private reservationService:ReservationService) {
  }

  ngOnInit() {
  }

 
  exportPdfReservation(reservationId: number): void {
    this.reservationService.exportPdf(reservationId).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Reservation.pdf';
        link.click();

        setTimeout(() => {
          window.URL.revokeObjectURL(link.href);
          link.remove();
        }, 100);
      },
      (error: any) => {
        console.error('Error exporting PDF:', error);
      }
    );
  }
}
