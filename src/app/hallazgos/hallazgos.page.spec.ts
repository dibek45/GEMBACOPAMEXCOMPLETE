import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallazgosPage } from './hallazgos.page';

describe('HallazgosPage', () => {
  let component: HallazgosPage;
  let fixture: ComponentFixture<HallazgosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallazgosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallazgosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
