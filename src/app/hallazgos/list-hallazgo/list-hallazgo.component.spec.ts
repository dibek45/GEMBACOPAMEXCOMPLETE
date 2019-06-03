import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHallazgoComponent } from './list-hallazgo.component';

describe('ListHallazgoComponent', () => {
  let component: ListHallazgoComponent;
  let fixture: ComponentFixture<ListHallazgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHallazgoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHallazgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
