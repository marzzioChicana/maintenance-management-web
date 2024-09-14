import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { MaintenanceRequest, MaintenanceResponse } from '../../models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  baseUrl = environment.baseUrl + "maintenances"

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

  getMaintenancesByUserId(userId: number): Observable<MaintenanceResponse[]> {
    return this.http
      .get<MaintenanceResponse[]>(`${this.baseUrl}/user/${userId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createMaintenance(maintenanceRequest: MaintenanceRequest) {
    return this.http
      .post<MaintenanceResponse>(this.baseUrl, maintenanceRequest, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteMaintenanceByMachineId(machineId: number) {
    return this.http
      .delete(`${this.baseUrl}/${machineId}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
