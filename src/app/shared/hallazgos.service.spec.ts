import { TestBed } from '@angular/core/testing';

import { HallazgosService } from './hallazgos.service';

describe('HallazgosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HallazgosService = TestBed.get(HallazgosService);
    expect(service).toBeTruthy();
  });
});
