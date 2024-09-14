import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { MachineService } from '../../services/machine/machine.service';

@Component({
  selector: 'app-deletion-confirmation',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './deletion-confirmation.component.html',
  styleUrl: './deletion-confirmation.component.css'
})
export class DeletionConfirmationComponent implements OnInit{
  machineId!: number;
  message!: string;

  constructor(private router: Router, private machineService: MachineService) {}

  ngOnInit(): void {
    this.machineId = history.state.machineId;
    console.log('ID de la máquina:', this.machineId);
  }
  
  cancelDelete(): void {
    this.router.navigate(['/machines']).then();
  }

  deleteMachine(): void {
    this.machineService.deleteMachine(this.machineId).subscribe(() => {
      console.log('Machine deleted successfully');
    }, (error) => {
      console.error('Error deleting machine', error);
    });

    setTimeout(() => {
      this.router.navigate(['/machines']).then();
    }, 3000);
  }
}
