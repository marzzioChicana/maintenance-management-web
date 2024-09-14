import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePartsListComponent } from './spare-parts-list.component';

describe('SparePartsListComponent', () => {
  let component: SparePartsListComponent;
  let fixture: ComponentFixture<SparePartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparePartsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SparePartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
