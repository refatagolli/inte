import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRequestResponsesComponent } from './staff-request-responses.component';

describe('StaffRequestResponsesComponent', () => {
  let component: StaffRequestResponsesComponent;
  let fixture: ComponentFixture<StaffRequestResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRequestResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRequestResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
