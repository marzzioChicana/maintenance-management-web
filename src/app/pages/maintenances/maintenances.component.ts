import { Component } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { MachinesListComponent } from "../machines-list/machines-list.component";
import { MaintenancesTableComponent } from "../../components/maintenances-table/maintenances-table.component";

@Component({
  selector: 'app-maintenances',
  standalone: true,
  imports: [ToolbarComponent, MachinesListComponent, MaintenancesTableComponent],
  templateUrl: './maintenances.component.html',
  styleUrl: './maintenances.component.css'
})
export class MaintenancesComponent {

}
