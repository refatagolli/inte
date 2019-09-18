import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCardExpandableComponent } from './staff-card-expandable.component';

describe('StaffCardExpandableComponent', () => {
  let component: StaffCardExpandableComponent;
  let fixture: ComponentFixture<StaffCardExpandableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffCardExpandableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCardExpandableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
