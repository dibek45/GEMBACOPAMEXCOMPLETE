import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHallazgosComponent } from './add-hallazgos.component';

describe('AddHallazgosComponent', () => {
  let component: AddHallazgosComponent;
  let fixture: ComponentFixture<AddHallazgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHallazgosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHallazgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
