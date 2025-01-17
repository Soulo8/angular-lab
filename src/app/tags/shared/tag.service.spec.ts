import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

describe('TagService', () => {
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('making an api get tags request', async () => {
    const DEFAULT_TAGS = [
      {
        id: 1,
        '@id': '/api/tags/1',
        name: 'Tag 1'
      }
    ];

    const httpTesting = TestBed.inject(HttpTestingController);

    const tags$ = service.getTags();

    const tagPromise = firstValueFrom(tags$);

    const req = httpTesting.expectOne(`${environment.apiUrl}/api/tags`, 'Request to get tags');

    expect(req.request.method).toBe('GET');

    req.flush({ member: DEFAULT_TAGS });

    expect(await tagPromise).toEqual(DEFAULT_TAGS);

    httpTesting.verify();
  });
});
