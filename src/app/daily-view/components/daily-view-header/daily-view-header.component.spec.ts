import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyViewHeaderComponent } from './daily-view-header.component';

describe('DailyViewHeaderComponent', () => {
  let component: DailyViewHeaderComponent;
  let fixture: ComponentFixture<DailyViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
