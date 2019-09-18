import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillShiftComponentComponent } from './fill-shift-component.component';

describe('FillShiftComponentComponent', () => {
  let component: FillShiftComponentComponent;
  let fixture: ComponentFixture<FillShiftComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillShiftComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillShiftComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
