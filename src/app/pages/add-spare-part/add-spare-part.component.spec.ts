import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSparePartComponent } from './add-spare-part.component';

describe('AddSparePartComponent', () => {
  let component: AddSparePartComponent;
  let fixture: ComponentFixture<AddSparePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSparePartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSparePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
