import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancesTableComponent } from './maintenances-table.component';

describe('MaintenancesTableComponent', () => {
  let component: MaintenancesTableComponent;
  let fixture: ComponentFixture<MaintenancesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenancesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
