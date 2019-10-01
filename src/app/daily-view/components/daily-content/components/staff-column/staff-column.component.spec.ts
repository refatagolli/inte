import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffColumnComponent } from './staff-column.component';

describe('StaffColumnComponent', () => {
  let component: StaffColumnComponent;
  let fixture: ComponentFixture<StaffColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
