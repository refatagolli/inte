import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestIntelyproComponent } from './request-intelypro.component';

describe('RequestIntelyproComponent', () => {
  let component: RequestIntelyproComponent;
  let fixture: ComponentFixture<RequestIntelyproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestIntelyproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestIntelyproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
