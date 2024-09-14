import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { SparePartRequest, SparePartResponse } from '../../models/spare-part.model';

@Injectable({
  providedIn: 'root'
})
export class SparePartService {

  baseUrl = environment.baseUrl + "spare/parts"

  constructor(private http: HttpClient) { }

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

  getSpareParts(): Observable<SparePartResponse[]> {
    return this.http
      .get<SparePartResponse[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSparePartById(id: number): Observable<SparePartResponse> {
    return this.http
      .get<SparePartResponse>(`${this.baseUrl}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSparePartsByUserId(userId: number): Observable<SparePartResponse[]> {
    return this.http
      .get<SparePartResponse[]>(`${this.baseUrl}/user/${userId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createSparePart(sparePartRequest: SparePartRequest) {
    return this.http
      .post<SparePartResponse>(this.baseUrl, sparePartRequest, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateSparePart(id: number, sparePartRequest: SparePartRequest) {
    return this.http
      .put<SparePartResponse>(`${this.baseUrl}/${id}`, sparePartRequest, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteSparePart(id: number) {
    return this.http
      .delete<SparePartResponse>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
