import { Component } from '@angular/core';

import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { SparePartService } from '../../services/spare-part/spare-part.service';
import { SparePartRequest } from '../../models/spare-part.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-spare-part-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule, InputNumberModule, ButtonModule],
  templateUrl: './add-spare-part-form.component.html',
  styleUrl: './add-spare-part-form.component.css'
})
export class AddSparePartFormComponent {
  sparePartForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService, private sparePartService: SparePartService) {
    this.sparePartForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]*$')]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      supplier: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    const localUserId = this.authenticationService.getCurrentUserId();

    if (this.sparePartForm.valid) {
      const sparePart: SparePartRequest = {
        name: this.sparePartForm.get('name')?.value,
        code: this.sparePartForm.get('code')?.value,
        quantity: this.sparePartForm.get('quantity')?.value,
        supplier: this.sparePartForm.get('supplier')?.value,
        price: this.sparePartForm.get('price')?.value,
        userId: localUserId
      }

      this.sparePartService.createSparePart(sparePart).subscribe(
        () => {
          this.router.navigate(['/spare/parts']).then();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Object.keys(this.sparePartForm.controls).forEach(key => {
        const control = this.sparePartForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
