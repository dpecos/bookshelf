/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CollectionsService } from './collections.service';

describe('Service: Collections', () => {
  beforeEach(() => {
    addProviders([CollectionsService]);
  });

  it('should ...',
    inject([CollectionsService],
      (service: CollectionsService) => {
        expect(service).toBeTruthy();
      }));
});
