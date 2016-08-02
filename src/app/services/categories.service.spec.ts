/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { CategoriesService } from './categories.service';

describe('Service: Categories', () => {
  beforeEach(() => {
    addProviders([CategoriesService]);
  });

  it('should ...',
    inject([CategoriesService],
      (service: CategoriesService) => {
        expect(service).toBeTruthy();
      }));
});
