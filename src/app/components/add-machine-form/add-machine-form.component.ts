import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Subject } from 'rxjs';

import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { MachineService } from '../../services/machine/machine.service';
import { MachineRequest } from '../../models/machine.model';
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
  selector: 'app-add-machine-form',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule, CalendarModule, InputNumberModule],
  templateUrl: './add-machine-form.component.html',
  styleUrl: './add-machine-form.component.css'
})
export class AddMachineFormComponent implements OnInit{
  photo: string = '../../../assets/img/add-machine/add-image.png';
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
    imageActive: [null as File | null, Validators.required]
  })

  constructor(private router: Router, private storage: Storage, private ngZone: NgZone, private fb: FormBuilder, private machineService: MachineService, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
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
    this.uploadImage(this.image);
    this.downloadURL$.subscribe(url => {
      const typeValue = typeof this.addMachineForm.value.type === 'object' 
      ? this.addMachineForm.value.type?.value 
      : this.addMachineForm.value.type;

      const machineRequest: MachineRequest = {
        name: this.addMachineForm.value.name ?? '',
        type: this.addMachineForm.value.type?.value ?? '',
        acquisitionDate: this.addMachineForm.value.acquisitionDate 
        ? new Date(this.addMachineForm.value.acquisitionDate) 
        : new Date(),
        status: this.addMachineForm.value.status?.value ?? '',
        lastMaintenance: null,
        usefulLife: parseInt(this.addMachineForm.value.usefulLife ?? ''),
        photo: url,
        userId: this.authenticationService.getCurrentUserId()
      }

      console.log(this.addMachineForm.value);

      console.log(machineRequest);

      this.machineService.createMachine(machineRequest).subscribe(
        () => {
          this.ngZone.run(() => {
            this.router.navigate(['/machines']);
          });
        }, (error) => {
          console.error(error);
        }
      )
    })
  }
}
