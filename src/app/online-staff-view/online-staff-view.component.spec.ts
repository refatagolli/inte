import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStaffViewComponent } from './online-staff-view.component';

describe('OnlineStaffViewComponent', () => {
  let component: OnlineStaffViewComponent;
  let fixture: ComponentFixture<OnlineStaffViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStaffViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStaffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
