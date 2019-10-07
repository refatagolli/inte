import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStaffViewNotificationComponent } from './online-staff-view-notification.component';

describe('OnlineStaffViewNotificationComponent', () => {
  let component: OnlineStaffViewNotificationComponent;
  let fixture: ComponentFixture<OnlineStaffViewNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStaffViewNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStaffViewNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
