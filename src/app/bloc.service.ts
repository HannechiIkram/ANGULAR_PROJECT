import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from './models/bloc';
import { Foyer } from './models/foyer';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true 
};

@Injectable({
  providedIn: 'root'
})

export class BlocService {
  


  baseUrl = 'http://localhost:8081/api/blocs';
  constructor(private http: HttpClient) { }
  addBloc(data: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(this.baseUrl+'/addBloc', data,httpOptions);
  }
  showBloc():Observable<Bloc[]>{
    return this.http.get<Bloc[]>(this.baseUrl+'/findAll',httpOptions)
  }

  fetchBlocById(id: any) {
    return this.http.get<Bloc>(this.baseUrl+'/findById/' + id,httpOptions)
  }

  fetchFoyerById(id: any):Observable<Foyer> {
    return this.http.get<Foyer>(this.baseUrl+ id)
  }
  updateBloc(data: Bloc,idBloc:number): Observable<Bloc> {
    data.idBloc=idBloc
    return this.http.put<Bloc>(this.baseUrl+'/editBloc', data,httpOptions);
  }
  deleteBloc(idbloc:number): Observable<any>{
   return this.http.delete<Bloc>(this.baseUrl+'/deleteByID/'+idbloc,httpOptions)
  }


}
