import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyViewHeaderComponent } from './weekly-view-header.component';

describe('WeeklyViewHeaderComponent', () => {
  let component: WeeklyViewHeaderComponent;
  let fixture: ComponentFixture<WeeklyViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
