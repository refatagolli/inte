import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStaffViewOpenShiftsComponent } from './online-staff-view-open-shifts.component';

describe('OnlineStaffViewOpenShiftsComponent', () => {
  let component: OnlineStaffViewOpenShiftsComponent;
  let fixture: ComponentFixture<OnlineStaffViewOpenShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStaffViewOpenShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStaffViewOpenShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
