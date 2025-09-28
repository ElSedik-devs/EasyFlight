import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimbookingComponent } from './confrimbooking.component';

describe('ConfrimbookingComponent', () => {
  let component: ConfrimbookingComponent;
  let fixture: ComponentFixture<ConfrimbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfrimbookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfrimbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
