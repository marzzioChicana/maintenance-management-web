import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CardSparePartComponent } from "../../components/card-spare-part/card-spare-part.component";
import { SparePartService } from '../../services/spare-part/spare-part.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CreateMaintenanceDialogComponent } from "../../components/create-maintenance-dialog/create-maintenance-dialog.component";

@Component({
  selector: 'app-spare-parts-list',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, ProgressSpinnerModule, ButtonModule, CardSparePartComponent, CreateMaintenanceDialogComponent],
  templateUrl: './spare-parts-list.component.html',
  styleUrl: './spare-parts-list.component.css'
})
export class SparePartsListComponent implements OnInit{
  spareParts: any[] = [];
  isLoading = true;

  constructor(private router: Router, private authenticationService: AuthenticationService , private sparePartService: SparePartService) {}

  ngOnInit(): void {
    this.loadSpareParts();
  }

  loadSpareParts(): void {
    var localUserId = this.authenticationService.getCurrentUserId();

    this.sparePartService.getSparePartsByUserId(localUserId).subscribe(
      (data) => {
        this.spareParts = data.filter(sparePart => sparePart.quantity > 0);
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  goToAddSparePartComponent() {
    this.router.navigate(['/spare/parts/add']).then();
  }

  isSparePartsEmpty(): boolean {
    return this.spareParts.length === 0;
  }

  handleRefresh() {
    this.loadSpareParts();
    console.log('Refreshed');
  }
}
