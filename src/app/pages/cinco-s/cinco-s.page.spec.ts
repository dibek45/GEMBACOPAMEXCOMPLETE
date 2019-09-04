import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CincoSPage } from './cinco-s.page';

describe('CincoSPage', () => {
  let component: CincoSPage;
  let fixture: ComponentFixture<CincoSPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CincoSPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CincoSPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
