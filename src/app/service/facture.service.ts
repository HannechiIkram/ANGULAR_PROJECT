import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facture } from '../models/Facture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    }
private ReservationId:number;

private baseUrl = "http://localhost:8081/facture"


  constructor(private http : HttpClient) { }

getFactureByID(id:any):any{
 return this.http.get<Facture>(`http://localhost:8081/facture/${id}`)
}

addFacture(facture: Facture): Observable<any> {
  return this.http.post<Facture>("http://localhost:8081/facture", facture, this.httpOptions);
}
getAllFactures(): Observable<Facture[]> {
  return this.http.get<Facture[]>("http://localhost:8081/facture");
}
deleteFacture(id: number){
  return this.http.delete(`http://localhost:8081/facture/${id}`);
};
}
