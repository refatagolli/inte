import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelyproProfileComponent } from './intelypro-profile.component';

describe('IntelyproProfileComponent', () => {
  let component: IntelyproProfileComponent;
  let fixture: ComponentFixture<IntelyproProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelyproProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelyproProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
