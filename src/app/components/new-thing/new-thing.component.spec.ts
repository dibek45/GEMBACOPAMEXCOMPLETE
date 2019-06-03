import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewThingComponent } from './new-thing.component';

describe('NewThingComponent', () => {
  let component: NewThingComponent;
  let fixture: ComponentFixture<NewThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewThingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
