import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGroupingCardComponent } from './staff-grouping-card.component';

describe('StaffGroupingCardComponent', () => {
  let component: StaffGroupingCardComponent;
  let fixture: ComponentFixture<StaffGroupingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffGroupingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffGroupingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
