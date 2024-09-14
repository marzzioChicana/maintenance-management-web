import { Component } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { AddMachineFormComponent } from "../../components/add-machine-form/add-machine-form.component";

@Component({
  selector: 'app-add-machine',
  standalone: true,
  imports: [ToolbarComponent, AddMachineFormComponent],
  templateUrl: './add-machine.component.html',
  styleUrl: './add-machine.component.css'
})
export class AddMachineComponent {

}
