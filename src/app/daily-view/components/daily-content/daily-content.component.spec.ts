import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyContentComponent } from './daily-content.component';

describe('DailyContentComponent', () => {
  let component: DailyContentComponent;
  let fixture: ComponentFixture<DailyContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
