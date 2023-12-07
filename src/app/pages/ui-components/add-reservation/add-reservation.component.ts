import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/models/Etudiant';
import { Reservation } from 'src/app/models/Reservation';
import { Chambre } from 'src/app/models/chambre';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {
  selectedCin: string;
  SelectedChambre: string;

  reservation: Reservation = {
    idReservation:0,
    anneeReservation: '',
    estValide: false,
    etudiants: [] ,
    chambre: []
  };

  etudiants: Etudiant[] = [];
  chambres: Chambre[] = [];
  private ReservationId :number;


  constructor(private serviceReservation: ReservationService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadEtudiants();
    this.loadChambres();

    this.activatedRoute.params.subscribe(params => {
      const reservationId = params['reservationId'];
      if (reservationId) {
        this.serviceReservation.getReservationByID(reservationId).subscribe(
          (reservation: any) => {
            console.log
            const dateString=reservation.anneeReservation;
            const isoDateString = dateString.replace(" ", "T");
            const date = new Date(isoDateString);
            console.log("sd ",date)
            const format='yyyy-MM-dd';
            const locale='en-us';
            const formattedDate=formatDate(date, format, locale);
            this.SelectedChambre = reservation.chamber ? reservation.chamber.numerochamber : '';
            this.selectedCin = reservation.etudiants ? reservation.etudiants[0].cin : '';
            console.log("cin ",this.selectedCin," num " ,this.SelectedChambre);
            this.reservation = reservation
            this.reservation.anneeReservation=formattedDate;
          },
          (error:any) => {
            console.error('Failed to fetch reservation data', error);
          }
        );
      }
    });
  }



  loadEtudiants() {
    this.serviceReservation.getAllEtudiants().subscribe(
      (data) => {
        this.etudiants = data;
      },
      (error) => {
        console.error('Error fetching Etudiants:', error);
      }
    );
  }

  loadChambres() {
    this.serviceReservation.getAllChambres().subscribe(
      (data) => {
        this.chambres = data;
      },
      (error) => {
        console.error('Error fetching Chambres:', error);
      }
    );
  }
  onSubmit() {
    const myNumber = Number(this.SelectedChambre);
    console.log(myNumber)
    console.log('Type of myNumber:', typeof myNumber); // Log the type of myNumber

    const myNumber1 = Number(this.selectedCin);


    this.serviceReservation.addReservationWithChamber(this.reservation,myNumber,myNumber1).subscribe(
      (d) => {
        console.log(d);
        this.router.navigate(['/ui-components/reservation']);
      }
    );
  }
}
