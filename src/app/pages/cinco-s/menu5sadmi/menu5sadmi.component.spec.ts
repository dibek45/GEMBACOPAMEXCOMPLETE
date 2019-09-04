import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu5sadmiComponent } from './menu5sadmi.component';

describe('Menu5sadmiComponent', () => {
  let component: Menu5sadmiComponent;
  let fixture: ComponentFixture<Menu5sadmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Menu5sadmiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Menu5sadmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
