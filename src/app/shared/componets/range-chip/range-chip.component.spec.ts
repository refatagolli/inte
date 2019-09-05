import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeChipComponent } from './range-chip.component';

describe('RangeChipComponent', () => {
  let component: RangeChipComponent;
  let fixture: ComponentFixture<RangeChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
