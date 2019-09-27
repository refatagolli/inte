import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManagementSidebarsComponent } from './staff-management-sidebars.component';

describe('StaffManagementSidebarsComponent', () => {
  let component: StaffManagementSidebarsComponent;
  let fixture: ComponentFixture<StaffManagementSidebarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffManagementSidebarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManagementSidebarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
