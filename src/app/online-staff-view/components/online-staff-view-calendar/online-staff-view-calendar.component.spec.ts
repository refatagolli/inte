import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStaffViewCalendarComponent } from './online-staff-view-calendar.component';

describe('OnlineStaffViewCalendarComponent', () => {
  let component: OnlineStaffViewCalendarComponent;
  let fixture: ComponentFixture<OnlineStaffViewCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStaffViewCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStaffViewCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
