import { TestBed } from '@angular/core/testing';

import { ResponsableService } from './responsable.service';

describe('ResponsableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponsableService = TestBed.get(ResponsableService);
    expect(service).toBeTruthy();
  });
});
