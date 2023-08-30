import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAndRevComponent } from './rate-and-rev.component';

describe('RateAndRevComponent', () => {
  let component: RateAndRevComponent;
  let fixture: ComponentFixture<RateAndRevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateAndRevComponent]
    });
    fixture = TestBed.createComponent(RateAndRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
