import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSparePartComponent } from './card-spare-part.component';

describe('CardSparePartComponent', () => {
  let component: CardSparePartComponent;
  let fixture: ComponentFixture<CardSparePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSparePartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSparePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
