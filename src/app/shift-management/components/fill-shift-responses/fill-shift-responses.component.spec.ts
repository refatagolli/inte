import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillShiftResponsesComponent } from './fill-shift-responses.component';

describe('FillShiftResponsesComponent', () => {
  let component: FillShiftResponsesComponent;
  let fixture: ComponentFixture<FillShiftResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillShiftResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillShiftResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
