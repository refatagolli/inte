import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSystemTopHeaderComponent } from './card-system-top-header.component';

describe('CardSystemTopHeaderComponent', () => {
  let component: CardSystemTopHeaderComponent;
  let fixture: ComponentFixture<CardSystemTopHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSystemTopHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSystemTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
