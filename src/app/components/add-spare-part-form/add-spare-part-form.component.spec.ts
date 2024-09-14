import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSparePartFormComponent } from './add-spare-part-form.component';

describe('AddSparePartFormComponent', () => {
  let component: AddSparePartFormComponent;
  let fixture: ComponentFixture<AddSparePartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSparePartFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSparePartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
