import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyBtnComponent } from './fancy-btn.component';

describe('FancyBtnComponent', () => {
  let component: FancyBtnComponent;
  let fixture: ComponentFixture<FancyBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FancyBtnComponent]
    });
    fixture = TestBed.createComponent(FancyBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
