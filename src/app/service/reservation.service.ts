import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/Etudiant';
import { Chambre } from '../models/chambre';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    }

    private ReservationId:number;


  private baseUrl = "http://localhost:8081"


  constructor(private http : HttpClient) { }
 /* getReservationById(email:any):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(environment.baseURL+
     environment.ReservationBackendAPIS+"/findReservationByIDEtudiant/"+email , this.httpOptions)
  }*///
 getReservationByID(id:any):any{
 return this.http.get<Reservation>(`http://localhost:8081/findReservationByID/${id}`)
}

addReservation(reservation: Reservation): Observable<any> {
  return this.http.post<Reservation>("http://localhost:8081/addReservation", reservation, this.httpOptions);
}
getAllReservations(): Observable<Reservation[]> {
  return this.http.get<Reservation[]>("http://localhost:8081/findAllReservation");
}
deleteReservation(id: number){
  return this.http.delete(`http://localhost:8081/DeleteReservation/${id}`);
};

  deleteReservation1(id: number){
    return this.http.delete(`http://localhost:8081/dd/${id}`);
  };

  addReservationAndAffectEtudiantAndChambre(reservation: Reservation, numChamber:String , cin:String): Observable<any> {
    return this.http.post<Reservation>("http://localhost:8081/generateReservation/"+numChamber+"/"+cin, reservation, this.httpOptions);
  }
  addReservationWithChamber(reservation: Reservation, numChamber: number, cin: number): Observable<Reservation> {
    const url = `${this.baseUrl}/generateReservation/${numChamber}/${cin}`;
    return this.http.post<Reservation>(url, reservation);
  }



  exportPdf(reservationId: number): Observable<any> {
    const url = `${this.baseUrl}/exportpdf/${reservationId}`;
    // Set responseType to 'blob' for binary data (PDF)
    return this.http.get(url, { responseType: 'blob' });
  }


  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>("http://localhost:8081/api/etudiants/findAllEtudiant");
  }

  getAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>("http://localhost:8081/findAllChambers");
  }


}
