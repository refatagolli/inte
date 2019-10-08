import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStaffViewMyScheduleComponent } from './online-staff-view-my-schedule.component';

describe('OnlineStaffViewMyScheduleComponent', () => {
  let component: OnlineStaffViewMyScheduleComponent;
  let fixture: ComponentFixture<OnlineStaffViewMyScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStaffViewMyScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStaffViewMyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
