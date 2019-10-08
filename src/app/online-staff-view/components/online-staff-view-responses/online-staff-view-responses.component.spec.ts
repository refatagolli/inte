import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStaffViewResponsesComponent } from './online-staff-view-responses.component';

describe('OnlineStaffViewResponsesComponent', () => {
  let component: OnlineStaffViewResponsesComponent;
  let fixture: ComponentFixture<OnlineStaffViewResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStaffViewResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStaffViewResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
