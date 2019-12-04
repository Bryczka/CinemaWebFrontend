/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilmshowService } from './filmshow.service';

describe('Service: Filmshow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmshowService]
    });
  });

  it('should ...', inject([FilmshowService], (service: FilmshowService) => {
    expect(service).toBeTruthy();
  }));
});
