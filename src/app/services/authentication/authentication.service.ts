import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SignInRequest, SignInResponse, SignUpRequest } from '../../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.baseUrl + "auth"

  constructor(private router: Router, private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error.message}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error.message}`
      );
    }
    return throwError(() => ({ status: error.status, message: error.error.message }))
  }

  getIsSignedIn(): boolean {
    return localStorage.getItem('isSignedIn') === 'true';
  }

  getCurrentUserId() {
    return parseInt(localStorage.getItem('userId')!);
  }

  getCurrentUsername() {
    return localStorage.getItem('username');
  }

  setSignedIn(value: boolean) {
    localStorage.setItem('isSignedIn', value.toString());
  }

  setSignedInUserId(value: number) {
    localStorage.setItem('userId', value.toString());
  }

  setSignedInUsername(value: string) {
    localStorage.setItem('username', value);
  }

  signUp(signUpRequest: SignUpRequest) {
    return this.http
      .post(`${this.baseUrl}/sign-up`, signUpRequest, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  signIn(signInRequest: SignInRequest) {
    return this.http.post<SignInResponse>(`${this.baseUrl}/sign-in`, signInRequest, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  signOut() {
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']).then();
  }
}
