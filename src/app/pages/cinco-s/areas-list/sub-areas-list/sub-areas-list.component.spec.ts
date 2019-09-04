import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAreasListComponent } from './sub-areas-list.component';

describe('SubAreasListComponent', () => {
  let component: SubAreasListComponent;
  let fixture: ComponentFixture<SubAreasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAreasListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAreasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
