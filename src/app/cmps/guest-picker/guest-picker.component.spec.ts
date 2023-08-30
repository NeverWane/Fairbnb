import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPickerComponent } from './guest-picker.component';

describe('GuestPickerComponent', () => {
  let component: GuestPickerComponent;
  let fixture: ComponentFixture<GuestPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestPickerComponent]
    });
    fixture = TestBed.createComponent(GuestPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
