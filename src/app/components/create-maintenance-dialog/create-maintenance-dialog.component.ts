import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SparePartRequest, SparePartResponse } from '../../models/spare-part.model';

import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { MachineRequestToUpdate, MachineResponse } from '../../models/machine.model';
import { MachineService } from '../../services/machine/machine.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MaintenanceService } from '../../services/maintenance/maintenance.service';
import { MaintenanceRequest } from '../../models/maintenance.model';
import { SparePartService } from '../../services/spare-part/spare-part.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-maintenance-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule, ButtonModule, DropdownModule, InputNumberModule, InputTextareaModule],
  templateUrl: './create-maintenance-dialog.component.html',
  styleUrl: './create-maintenance-dialog.component.css'
})
export class CreateMaintenanceDialogComponent implements OnInit{
  @Input() visible: boolean = false;
  @Input() sparePart!: SparePartResponse;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();
  
  purchaseForm!: FormGroup;
  machines: MachineResponse[] = [];

  constructor(private router: Router, private fb: FormBuilder, private authenticatinoService: AuthenticationService , private machineService: MachineService, private maintenanceService: MaintenanceService, private sparePartService: SparePartService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const localUserId = this.authenticatinoService.getCurrentUserId();
    this.purchaseForm = this.fb.group({
      machine: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });

    this.machineService.getMachinesByUserId(localUserId).subscribe(
      (data) => {
        this.machines = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.purchaseForm.reset({ quantity: 1 });
  }

  get totalCost(): number {
    return this.sparePart.price * (this.purchaseForm.get('quantity')?.value || 0);
  }

  onSubmit() {
    if (this.purchaseForm.valid) {
      const maintenanceRequest: MaintenanceRequest = {
        date: new Date(),
        cost: this.totalCost,
        description: this.purchaseForm.get('description')?.value,
        quantity: this.purchaseForm.get('quantity')?.value,
        machineId: this.purchaseForm.get('machine')?.value.id,
        sparePartId: this.sparePart.id
      };

      this.maintenanceService.createMaintenance(maintenanceRequest).subscribe(
        (data) => {
          this.refreshData.emit();
          this.closeDialog();
          console.log('Prev Refreshed');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
