import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { EditMachineComponent } from "../../components/edit-machine/edit-machine.component";
import { MachineResponse } from '../../models/machine.model';

@Component({
  selector: 'app-edit-machine-page',
  standalone: true,
  imports: [ToolbarComponent, EditMachineComponent],
  templateUrl: './edit-machine-page.component.html',
  styleUrl: './edit-machine-page.component.css'
})
export class EditMachinePageComponent implements OnInit{
  machineInit!: MachineResponse;

  ngOnInit(): void {
    this.machineInit = history.state.machine;
    console.log(this.machineInit);
  }
}
