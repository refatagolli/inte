import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSystemShiftDetailsComponent } from './card-system-shift-details.component';

describe('CardSystemShiftDetailsComponent', () => {
  let component: CardSystemShiftDetailsComponent;
  let fixture: ComponentFixture<CardSystemShiftDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSystemShiftDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSystemShiftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
