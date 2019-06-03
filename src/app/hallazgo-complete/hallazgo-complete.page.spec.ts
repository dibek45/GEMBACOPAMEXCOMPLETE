import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallazgoCompletePage } from './hallazgo-complete.page';

describe('HallazgoCompletePage', () => {
  let component: HallazgoCompletePage;
  let fixture: ComponentFixture<HallazgoCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallazgoCompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallazgoCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
