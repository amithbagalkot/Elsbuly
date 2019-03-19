import { TestBed, inject } from '@angular/core/testing';

import { RequestSenderService } from './request-sender.service';

describe('RequestSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestSenderService]
    });
  });

  it('should be created', inject([RequestSenderService], (service: RequestSenderService) => {
    expect(service).toBeTruthy();
  }));
});
