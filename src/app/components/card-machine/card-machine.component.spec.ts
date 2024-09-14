import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMachineComponent } from './card-machine.component';

describe('CardMachineComponent', () => {
  let component: CardMachineComponent;
  let fixture: ComponentFixture<CardMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
