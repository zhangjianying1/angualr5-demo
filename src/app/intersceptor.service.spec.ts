import { TestBed, inject } from '@angular/core/testing';

import { IntersceptorService } from './intersceptor.service';

describe('IntersceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntersceptorService]
    });
  });

  it('should be created', inject([IntersceptorService], (service: IntersceptorService) => {
    expect(service).toBeTruthy();
  }));
});
