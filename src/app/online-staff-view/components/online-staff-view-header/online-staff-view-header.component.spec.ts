import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStaffViewHeaderComponent } from './online-staff-view-header.component';

describe('OnlineStaffViewHeaderComponent', () => {
  let component: OnlineStaffViewHeaderComponent;
  let fixture: ComponentFixture<OnlineStaffViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStaffViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStaffViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
