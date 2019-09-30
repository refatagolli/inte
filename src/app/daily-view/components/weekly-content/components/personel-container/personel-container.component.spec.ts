import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelContainerComponent } from './personel-container.component';

describe('PersonelContainerComponent', () => {
  let component: PersonelContainerComponent;
  let fixture: ComponentFixture<PersonelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
