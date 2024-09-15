import { CommonModule } from '@angular/common';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Subject } from 'rxjs';

import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { MachineService } from '../../services/machine/machine.service';
import { MachineRequest, MachineRequestToUpdate, MachineResponse } from '../../models/machine.model';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

interface Type {
  label: string;
  value: string;
}

interface Status {
  label: string;
  value: string;
}


@Component({
  selector: 'app-edit-machine',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule, CalendarModule, InputNumberModule],
  templateUrl: './edit-machine.component.html',
  styleUrl: './edit-machine.component.css'
})
export class EditMachineComponent implements OnInit{
  @Input() machineInit!: MachineResponse;
  photo: string = '';
  types: Type[] | undefined;
  status: Status[] | undefined;

  image!: File;
  downloadURL$ = new Subject<string>();

  addMachineForm = this.fb.group({
    name: ['', Validators.required],
    type: [null as Type | null, Validators.required],
    acquisitionDate: ['', Validators.required],
    status: [null as Status | null, Validators.required],
    usefulLife: ['', Validators.required],
    imageActive: [null as File | null]
  });

  constructor(private router: Router, private storage: Storage, private ngZone: NgZone, private fb: FormBuilder, private machineService: MachineService, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.photo = this.machineInit.photo;

    if (this.machineInit) {
      this.initializeForm();
    }

    this.types = [
      {
        label: 'Lathe',
        value: 'Lathe'
      },
      {
        label: 'Milling',
        value: 'Milling'
      }
    ];

    this.status = [
      {
        label: 'Active',
        value: 'Active'
      },
      {
        label: 'Inactive',
        value: 'Inactive'
      }
    ];
  }

  initializeForm(): void {
    this.addMachineForm.patchValue({
      name: this.machineInit.name,
      type: { label: this.machineInit.type, value: this.machineInit.type } as Type,
      acquisitionDate: '',
      status: { label: this.machineInit.status, value: this.machineInit.status } as Status,
      usefulLife: this.machineInit.usefulLife.toString(),
      imageActive:  null
    });
  }

  onImageSelected(event: any) {
    const imageSelected: File = event.target.files[0];
    this.showImageSelected(imageSelected);
    this.addMachineForm.patchValue({
      imageActive: imageSelected
    });
  }

  showImageSelected(imageSelected: File) {
    if (imageSelected) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const previewImage = document.getElementById('image-preview') as HTMLImageElement;
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(imageSelected);
    }
    this.image = imageSelected;
  }

  async uploadImage(image: File) {
    const imagePath = `images/machines/${image.name}`;
    const imageRef = ref(this.storage, imagePath);
    const uploadImage = uploadBytesResumable(imageRef, image);

    uploadImage.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const url = await getDownloadURL(imageRef);
        this.downloadURL$.next(url);
      });
  }

  saveMachine() {
    if (this.image) {
      this.uploadImage(this.image);
      this.downloadURL$.subscribe(url => {
        this.submitMachineForm(url);
      });
    } else {
      this.submitMachineForm(this.photo);
    }
  }

  submitMachineForm(photoUrl: string) {
    const MachineRequestToUpdate: MachineRequestToUpdate = {
      id: this.machineInit.id,
      name: this.addMachineForm.value.name ?? '',
      type: this.addMachineForm.value.type?.value ?? '',
      acquisitionDate: this.addMachineForm.value.acquisitionDate
        ? new Date(this.addMachineForm.value.acquisitionDate)
        : new Date(),
      status: this.addMachineForm.value.status?.value ?? '',
      lastMaintenance: this.machineInit.lastMaintenance,
      usefulLife: parseInt(this.addMachineForm.value.usefulLife ?? ''),
      photo: photoUrl,
      userId: this.authenticationService.getCurrentUserId()
    };
  
    console.log(MachineRequestToUpdate);
  
    this.machineService.updateMachine(MachineRequestToUpdate).subscribe(
      () => {
        this.ngZone.run(() => {
          this.router.navigate(['/machines']);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
