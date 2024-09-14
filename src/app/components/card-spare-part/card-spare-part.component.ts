import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { SparePartResponse } from '../../models/spare-part.model';
import { CreateMaintenanceDialogComponent } from "../create-maintenance-dialog/create-maintenance-dialog.component";


@Component({
  selector: 'app-card-spare-part',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, BadgeModule, CreateMaintenanceDialogComponent],
  templateUrl: './card-spare-part.component.html',
  styleUrl: './card-spare-part.component.css'
})
export class CardSparePartComponent {
  @Input() sparePart!: SparePartResponse;
  isDialogVisible: boolean = false;

  getSeverity(stock: number) {
    if (stock > 50) return 'success';
    if (stock > 20) return 'warning';
    return 'danger';
  }

  getStockLabel(stock: number) {
    if (stock > 50) return 'In Stock';
    if (stock > 20) return 'Limited Stock';
    return 'Low Stock';
  }

  openDialog() {
    this.isDialogVisible = true;
  }
}
