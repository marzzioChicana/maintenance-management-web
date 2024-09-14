import { Component, OnInit, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SelectItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MaintenanceService } from '../../services/maintenance/maintenance.service';
import { MaintenanceResponse } from '../../models/maintenance.model';


@Component({
  selector: 'app-maintenances-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, ButtonModule, TagModule],
  templateUrl: './maintenances-table.component.html',
  styleUrl: './maintenances-table.component.css'
})
export class MaintenancesTableComponent implements OnInit {
  @ViewChild('dt') table: Table | undefined;

  maintenances: MaintenanceResponse[];
  loading: boolean = true;
  totalRecords: number;

  constructor(private authenticationService: AuthenticationService, private maintenanceService: MaintenanceService) {
    this.maintenances = [];
    this.totalRecords = 0;
  }

  ngOnInit() {
    const localUserId = this.authenticationService.getCurrentUserId();

    this.maintenanceService.getMaintenancesByUserId(localUserId).subscribe(
      (data) => {
        this.maintenances = data;
        this.totalRecords = this.maintenances.length;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table?.filterGlobal(filterValue, 'contains');
  }
}
