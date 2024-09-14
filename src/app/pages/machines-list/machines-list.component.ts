import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CardMachineComponent } from '../../components/card-machine/card-machine.component';
import { MachineResponse } from '../../models/machine.model';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { MachineService } from '../../services/machine/machine.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-machines-list',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, CardMachineComponent, ProgressSpinnerModule, ButtonModule],
  templateUrl: './machines-list.component.html',
  styleUrl: './machines-list.component.css'
})
export class MachinesListComponent implements OnInit{
  machines: MachineResponse[] = [];
  isLoading = true;

  constructor(private router: Router, private http: HttpClient, private machineService: MachineService, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  loadMachines(): void {
    this.machineService.getMachinesByUserId(this.authenticationService.getCurrentUserId()).subscribe((machines) => {
      this.machines = machines;
      this.isLoading = false;
    }, (error) => {
      console.error('Error loading machines', error);
      this.isLoading = false;
    });
  }
  
  goToAddMachineComponent() {
    this.router.navigate(['/machines/add']).then();
  }

  isMachinesEmpty(): boolean {
    return this.machines.length === 0;
  }
}
