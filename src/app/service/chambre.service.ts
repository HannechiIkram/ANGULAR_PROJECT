import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chambre } from '../models/chambre';
import { Etudiant } from '../models/Etudiant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
constructor(private http: HttpClient) {}

  chambreList:Chambre[]=[];
  private baseUrl = 'http://localhost:8081';
  getAllChambres() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get<Chambre[]>(this.baseUrl + '/findAllChambers');
  }

  getChambreById(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Chambre>(this.baseUrl   + '/findChamberByID/' + id);
  }

  addChambre(universite:{ nomUniversite: string; adresse: string}) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Chambre>(this.baseUrl + '/universites', universite, { headers });
  }

  updateChambre(id: number, universite: Chambre) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Chambre>(this.baseUrl + '/universites/' + id, universite);
  }

  deleteChambre(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let c:any=this.getChambreById(id)
    return this.http.delete(this.baseUrl + '/deleteChamber/',c);
  }



}
