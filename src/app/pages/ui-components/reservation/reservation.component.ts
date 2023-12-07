import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservations: any;
  filteredReservations:any;
  constructor(private serviceReservation: ReservationService,private router: Router) {}
  dateFilter: string = '';
  validFilter: string = '';
  ngOnInit(): void {
    this.loadReservations();
  }
  applyFilters() {
    this.reservations = this.reservations.filter((reservation: { anneeReservation: string; estValide: any; }) => {
        const dateMatches = !this.dateFilter || reservation.anneeReservation === this.dateFilter;
        const validMatches = !this.validFilter || (reservation.estValide ? 'true' : 'false') === this.validFilter;

        return dateMatches && validMatches;
    });
}
  onDeleteClick(id: number) {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.serviceReservation.deleteReservation1(id).subscribe(
        () => {
          console.log('Reservation deleted successfully.');
          this.loadReservations();
        },
        (error) => {
          console.error('Error deleting reservation:', error);
        }
      );
    }
  }
  onEditClick(reservationId: number) {
    this.router.navigate(['/ui-components/add-reservation', { reservationId: reservationId }]);
  }

  onPdfClick(reservationId: number) {
    this.serviceReservation.exportPdf(reservationId).subscribe(
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



  loadReservations() {
    this.serviceReservation.getAllReservations().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  onAddClick() {
    this.router.navigate(['/ui-components/add-reservation'])
  }
}
