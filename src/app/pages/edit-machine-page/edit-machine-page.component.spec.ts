import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMachinePageComponent } from './edit-machine-page.component';

describe('EditMachinePageComponent', () => {
  let component: EditMachinePageComponent;
  let fixture: ComponentFixture<EditMachinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMachinePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMachinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
