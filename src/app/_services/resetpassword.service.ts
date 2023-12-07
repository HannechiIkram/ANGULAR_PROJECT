import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
const API_URL = 'http://localhost:8081/reset';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true, 
  respnseType:'text', 
};

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  private baseUrl='http://localhost:8081/reset'
  private resetPasswordUrl='http://localhost:8081/reset/reset-passwordd'

  constructor(private http: HttpClient) {}

  forgotpassword(email:String):Observable<any>{
    return this.http.post(`${this.baseUrl}/forgot-password/`+email,httpOptions);
  }
   

  resetPassword(token: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    const requestBody = {
      password: password
    };
  
    console.log('Reset Password Request:', `${this.resetPasswordUrl}?token=${token}`, requestBody);
  
    return this.http.post(`${this.resetPasswordUrl}?token=${token}`, requestBody, { headers: headers, withCredentials: true })
      .pipe(
        tap(response => console.log('Password reset successfully', response)),
        catchError(error => {
          console.error('Error resetting password', error);
          throw error;
        })
      );
  }
  




}
