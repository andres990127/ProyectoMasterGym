import { TestBed } from '@angular/core/testing';

import { MensajesService } from './mensajes.service';

describe('MensajesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensajesService = TestBed.get(MensajesService);
    expect(service).toBeTruthy();
  });
});
