import { TestBed } from '@angular/core/testing';

import { GlobalMessageServiceService } from './global-message-service.service';

describe('GlobalMessageServiceService', () => {
  let service: GlobalMessageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalMessageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
