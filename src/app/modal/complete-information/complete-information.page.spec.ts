import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInformationPage } from './complete-information.page';

describe('CompleteInformationPage', () => {
  let component: CompleteInformationPage;
  let fixture: ComponentFixture<CompleteInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
