import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMachineFormComponent } from './add-machine-form.component';

describe('AddMachineFormComponent', () => {
  let component: AddMachineFormComponent;
  let fixture: ComponentFixture<AddMachineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMachineFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMachineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
