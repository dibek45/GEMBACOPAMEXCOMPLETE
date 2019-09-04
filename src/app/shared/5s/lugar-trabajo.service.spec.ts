import { TestBed } from '@angular/core/testing';

import { LugarTrabajoService } from './lugar-trabajo.service';

describe('LugarTrabajoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LugarTrabajoService = TestBed.get(LugarTrabajoService);
    expect(service).toBeTruthy();
  });
});
