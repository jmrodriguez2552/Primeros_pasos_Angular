/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManualsService } from './manuals.service';

describe('Service: Manuals', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManualsService]
    });
  });

  it('should ...', inject([ManualsService], (service: ManualsService) => {
    expect(service).toBeTruthy();
  }));
});
