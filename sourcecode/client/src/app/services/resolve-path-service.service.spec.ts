import { TestBed, inject } from '@angular/core/testing';

import { ResolvePathService } from './resolve-path-service.service';

describe('ResolvePathServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolvePathService]
    });
  });

  it('should be created', inject([ResolvePathService], (service: ResolvePathService) => {
    expect(service).toBeTruthy();
  }));
});
