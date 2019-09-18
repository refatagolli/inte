import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCardCheckboxComponent } from './staff-card-checkbox.component';

describe('StaffCardCheckboxComponent', () => {
  let component: StaffCardCheckboxComponent;
  let fixture: ComponentFixture<StaffCardCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCardCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCardCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
