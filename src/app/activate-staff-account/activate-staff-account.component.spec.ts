import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateStaffAccountComponent } from './activate-staff-account.component';

describe('ActivateStaffAccountComponent', () => {
  let component: ActivateStaffAccountComponent;
  let fixture: ComponentFixture<ActivateStaffAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateStaffAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateStaffAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
