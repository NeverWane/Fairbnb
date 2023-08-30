import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayBookComponent } from './stay-book.component';

describe('StayBookComponent', () => {
  let component: StayBookComponent;
  let fixture: ComponentFixture<StayBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StayBookComponent]
    });
    fixture = TestBed.createComponent(StayBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
