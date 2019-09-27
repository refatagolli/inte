import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyContentComponent } from './weekly-content.component';

describe('WeeklyContentComponent', () => {
  let component: WeeklyContentComponent;
  let fixture: ComponentFixture<WeeklyContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
