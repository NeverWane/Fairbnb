import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayReviewsComponent } from './stay-reviews.component';

describe('StayReviewsComponent', () => {
  let component: StayReviewsComponent;
  let fixture: ComponentFixture<StayReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StayReviewsComponent]
    });
    fixture = TestBed.createComponent(StayReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
