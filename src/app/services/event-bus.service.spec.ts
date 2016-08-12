/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { EventBusService } from './event-bus.service';

describe('Service: EventBusService', () => {
  beforeEach(() => {
    addProviders([EventBusService]);
  });

  it('should ...',
    inject([EventBusService],
      (service: EventBusService) => {
        expect(service).toBeTruthy();
      }));
});
