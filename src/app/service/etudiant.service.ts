import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etudiant } from '../models/Etudiant';
import { Observable } from 'rxjs';
import { Chambre } from '../models/chambre';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

  usersList:Etudiant[]=[];
  private baseUrl = 'http://localhost:8081/api/etudiants';
  constructor(private http:HttpClient) { }

  getEtudiantList():Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>("http://localhost:8081/api/etudiants/findAllEtudiant");
  }
  getTotalReservationsAffectes() : Observable<number>{
    return this.http.get<number>(this.baseUrl+"totalReservationsAffectes");
  }
  getEtudiantById(id: any): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.baseUrl}/findbyEtudiantId/${id}`);
  }
  removeEtudiant(id:any):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/DeleteByIDEtudiant/"+id
      );
  }
  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const url = `${this.baseUrl}/addEtudiant`;
    return this.http.post<Etudiant>(url, etudiant);
  }
  updateEtudiant(etudiant:Etudiant):Observable<Etudiant>{
    console.log('updateEtudiant',etudiant);
    return this.http.put<Etudiant>(this.baseUrl+"/updateEtudiant",etudiant);
  }

  getChambreByEtudiant(id: number):Observable<Chambre[]> {
    return this.http.get<[Chambre]>(this.baseUrl+"ChambreByEtudiant/"+id);

  }

  getAllChambre():Observable<Chambre[]> {
    return this.http.get<[Chambre]>("http://localhost:8181/api/etudiant/chambre/all");

  }
  
  pdfExport():Observable<Blob>{
    return this.http.get("http://localhost:8181/api/etudiants/export/pdf", {responseType: 'blob'});
  }

  excelExport():Observable<Blob>{
    return this.http.get("http://localhost:8181/api/etudiants/export-to-excel", {responseType: 'blob'});
  }
  
  pagination(nbre : number, page: number) : Observable<Etudiant[]>{
    return this.http.get<[Etudiant]>(this.baseUrl+"pagination/"+nbre+"/"+page);
  }
  
}
