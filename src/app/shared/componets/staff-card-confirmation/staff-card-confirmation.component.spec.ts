import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCardConfirmationComponent } from './staff-card-confirmation.component';

describe('StaffCardConfirmationComponent', () => {
  let component: StaffCardConfirmationComponent;
  let fixture: ComponentFixture<StaffCardConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCardConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCardConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
