import { Injectable } from '@angular/core';
import { Foyer } from '../models/foyer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bloc } from '../models/bloc';
import { Universite } from '../pages/ui-components/universite/models/Universite';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  private baseUrl = 'http://localhost:8086/foyer'; 
  
  constructor(private http:HttpClient) { }
  getAllFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.baseUrl}/findAllFoyer`);
  }
  findAllUniversite(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.baseUrl}/findAlluniversite`);
  }

  getFoyerById(id: number): Observable<Foyer> {
    return this.http.get<Foyer>(`${this.baseUrl}/findByIdFoyer/${id}`);
  }

  searchFoyersByNomFoyerOrUniversite(nom: string): Observable<Foyer> {
    return this.http.get<Foyer>( `${this.baseUrl}/seachfoyers/${nom}`);
  }

  // addFoyer(foyer: Foyer): Observable<Foyer> {
  //   return this.http.post<Foyer>(`${this.baseUrl}/AddFoyer`, foyer);
  // }

  updateFoyer(foyer: any): Observable<Foyer> {
    console.log('updateFoyer',foyer);
    
    
    return this.http.put<Foyer>(`${this.baseUrl}/UpdateFoyer`, foyer);
  }
  updateEtatFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(`${this.baseUrl}/UpdateEtatFoyerr`, foyer);
  }

  deleteFoyerById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteFoyerByID/${id}`);
  }

  deleteFoyer(foyer: Foyer): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/DeleteFoyer`, foyer);
  }

  addFoyerSelonEtat(foyer: Foyer, name: string,id: String): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.baseUrl}/AddFoyerselon/${name}/${id}`, foyer);
  }

   getNbEtudiantSelonFoyer(): Observable<any> {
     return this.http.get(`${this.baseUrl}/getNbEtudiantsParFoyer`);
   }
   getNbChambreSelonFoyer(): Observable<any> {
    const url = `${this.baseUrl}/getNbchamberParFoyer`;
    return this.http.get(url);
  }

//  getNbChambreSelonFoyer(): Observable<any> { 
//    return this.http.get(`${this.baseUrl}/GetNbChambreFoyer`)  
//  }

getNbChambreFoyerByType(): Observable<any> {
  const url = `${this.baseUrl}/getNbChambresParFoyerByType`;
  return this.http.get(url);
}

//  getNbChambreFoyerByType(): Observable<any> { 
//    return this.http.get(`${this.baseUrl}/GetNbChambreFoyerByType`);
//  }
 
addBlocToFoyer(idFoyer: number, blocs: Bloc[]): Observable<string> {
  const url = `${this.baseUrl}/AssignBlocsToFoyer/${idFoyer}`;
  return this.http.put<string>(url, blocs);
}

getAllBlocsNull(): Observable<Bloc[]> {
  return this.http.get<Bloc[]>(`${this.baseUrl}/findBlocNull`);
}


desaffecterBlocs(idFoyer: number): Observable<void> {
  const url = `${this.baseUrl}/desaffecterBlocsToFoyer/${idFoyer}`;
  return this.http.put<void>(url, {});
}
updateFoy(data: Foyer,idFoyer:number): Observable<Foyer> {
  data.idFoyer=idFoyer
  return this.http.put<Foyer>(`${this.baseUrl}/UpdateFoyer`, data);
}
}

