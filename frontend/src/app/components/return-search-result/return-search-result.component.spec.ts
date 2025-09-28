import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnSearchResultComponent } from './return-search-result.component';

describe('ReturnSearchResultComponent', () => {
  let component: ReturnSearchResultComponent;
  let fixture: ComponentFixture<ReturnSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnSearchResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
