import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabintypeComponent } from './cabintype.component';

describe('CabintypeComponent', () => {
  let component: CabintypeComponent;
  let fixture: ComponentFixture<CabintypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabintypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabintypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
