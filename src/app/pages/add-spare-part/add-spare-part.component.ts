import { Component } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { AddSparePartFormComponent } from "../../components/add-spare-part-form/add-spare-part-form.component";

@Component({
  selector: 'app-add-spare-part',
  standalone: true,
  imports: [ToolbarComponent, AddSparePartFormComponent],
  templateUrl: './add-spare-part.component.html',
  styleUrl: './add-spare-part.component.css'
})
export class AddSparePartComponent {

}
