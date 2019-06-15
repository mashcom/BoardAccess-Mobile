import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsPage } from './decisions.page';

describe('DecisionsPage', () => {
  let component: DecisionsPage;
  let fixture: ComponentFixture<DecisionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
