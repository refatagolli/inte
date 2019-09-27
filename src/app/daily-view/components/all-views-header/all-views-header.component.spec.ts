import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllViewsHeaderComponent } from './all-views-header.component';

describe('AllViewsHeaderComponent', () => {
  let component: AllViewsHeaderComponent;
  let fixture: ComponentFixture<AllViewsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllViewsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllViewsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
