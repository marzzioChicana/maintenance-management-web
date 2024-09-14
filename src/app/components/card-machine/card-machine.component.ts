import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MachineResponse } from '../../models/machine.model';
import { DialogModule } from 'primeng/dialog';
import { MachineService } from '../../services/machine/machine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-machine',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule],
  templateUrl: './card-machine.component.html',
  styleUrl: './card-machine.component.css'
})
export class CardMachineComponent implements OnChanges{
  @Input() machine!: MachineResponse;
  displayDialog: boolean = false;
  selectedMachine: MachineResponse | null = null;

  lastMaintenanceFormat: string = '';
  acquisitionDateFormat: string = '';

  constructor(private router: Router, private machineService: MachineService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['machine'] && this.machine) {
      this.formatDates();
    }
  }

  formatDates(): void {
    if (this.machine.lastMaintenance && Array.isArray(this.machine.lastMaintenance)) {
      const [year, month, day] = this.machine.lastMaintenance;
      this.lastMaintenanceFormat = `${day}/${month}/${year}`;
    } else {
      this.lastMaintenanceFormat = 'dd/mm/yyyy';
    }

    if (this.machine.acquisitionDate && Array.isArray(this.machine.acquisitionDate)) {
      const [year, month, day] = this.machine.acquisitionDate;
      this.acquisitionDateFormat = `${day}/${month}/${year}`;
    } else {
      this.acquisitionDateFormat = 'dd/mm/yyyy';
    }
  }

  showDialog(machine: MachineResponse): void {
    this.selectedMachine = machine;
    this.displayDialog = true;
    console.log(this.machine);
  }

  onHide(): void {
    this.selectedMachine = null;
  }

  editMachine(): void {
    this.router.navigate(['/edit/machine'], { state: { machine: this.machine } });
  }

  deleteMachine(): void {
    this.router.navigate(['/deletion/confirmation'], { state: { machineId: this.machine.id } });
  }
}
