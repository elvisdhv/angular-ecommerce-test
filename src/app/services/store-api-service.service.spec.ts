import { TestBed } from '@angular/core/testing';

import { StoreApiServiceService } from './store-api-service.service';

describe('StoreApiServiceService', () => {
  let service: StoreApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
