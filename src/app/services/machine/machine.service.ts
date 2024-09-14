import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { MachineRequest, MachineRequestToUpdate, MachineResponse } from '../../models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  baseUrl = environment.baseUrl + "machines"

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

  getMachines(): Observable<MachineResponse[]> {
    return this.http
      .get<MachineResponse[]>(this.baseUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  getMachineById(id: number): Observable<MachineResponse> {
    return this.http
      .get<MachineResponse>(`${this.baseUrl}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getMachinesByUserId(userId: number): Observable<MachineResponse[]> {
    return this.http
      .get<MachineResponse[]>(`${this.baseUrl}/user/${userId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createMachine(machineRequest: MachineRequest) {
    return this.http
      .post<MachineResponse>(this.baseUrl, machineRequest, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateMachine(MachineRequestToUpdate: MachineRequestToUpdate) {
    return this.http
      .put<MachineResponse>(this.baseUrl, MachineRequestToUpdate, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteMachine(id: number) {
    return this.http
      .delete<MachineResponse>(`${this.baseUrl}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
