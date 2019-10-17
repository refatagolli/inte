import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDeleteConfirmationComponent } from './staff-delete-confirmation.component';

describe('StaffDeleteConfirmationComponent', () => {
  let component: StaffDeleteConfirmationComponent;
  let fixture: ComponentFixture<StaffDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
