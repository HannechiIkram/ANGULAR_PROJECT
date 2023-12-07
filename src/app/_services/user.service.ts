import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/test/';

const httpOptions = {
  withCredentials: true, 
  respnseType:'text'
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}


  private baseUrl = 'http://localhost:8081/api/auth';


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all',httpOptions);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user',httpOptions);
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', httpOptions);
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', httpOptions);
  }

  uploadImageToUser(userId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.baseUrl}/${userId}/addImage`, formData,httpOptions);
  }
}

