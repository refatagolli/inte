import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCardRadioComponent } from './staff-card-radio.component';

describe('StaffCardRadioComponent', () => {
  let component: StaffCardRadioComponent;
  let fixture: ComponentFixture<StaffCardRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCardRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCardRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
