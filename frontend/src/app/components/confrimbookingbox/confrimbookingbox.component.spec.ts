import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimbookingboxComponent } from './confrimbookingbox.component';

describe('ConfrimbookingboxComponent', () => {
  let component: ConfrimbookingboxComponent;
  let fixture: ComponentFixture<ConfrimbookingboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfrimbookingboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfrimbookingboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
