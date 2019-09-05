import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMemberCardComponent } from './staff-member-card.component';

describe('StaffMemberCardComponent', () => {
  let component: StaffMemberCardComponent;
  let fixture: ComponentFixture<StaffMemberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMemberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
