import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universite } from '../models/Universite';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
private baseUrl = 'http://localhost:8081'; 
constructor(private http:HttpClient) { }


findAllUniversite(): Observable<Universite[]> {
  return this.http.get<Universite[]>(`${this.baseUrl}/findAllU`);
}
addUniversite(universite: Universite): Observable<Universite> {
return this.http.post<Universite>(`${this.baseUrl}/addUniversite`, universite,this.httpOptions);}

getUniversiteById(id: number): Observable<Universite> {
  const url = `${this.baseUrl}/universite/findById/${id}`;
  return this.http.get<Universite>(url);
}
updateUniversite(universite: any): Observable<Universite> {
console.log('updateUniversite', universite);

return this.http.put<Universite>(`${this.baseUrl}/updateUniversite`, universite);
}
// Assuming your service method looks like this:

deleteUniversite(universite: Universite): Observable<void> {
return this.http.delete<void>(`${this.baseUrl}/DeleteUniversite`, {
headers: new HttpHeaders({
  'Content-Type': 'application/json'
}),
body: universite
});
}
}
