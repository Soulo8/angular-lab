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

  it('making an api post tags request', async () => {
    const DEFAULT_TAG = {
      name: 'New tag'
    };

    const httpTesting = TestBed.inject(HttpTestingController);

    const tag$ = service.addTag(DEFAULT_TAG);

    const tagPromise = firstValueFrom(tag$);

    const req = httpTesting.expectOne(`${environment.apiUrl}/api/tags`, 'Request to post tags');

    expect(req.request.method).toBe('POST');

    req.flush(DEFAULT_TAG);

    expect(await tagPromise).toEqual(DEFAULT_TAG);

    httpTesting.verify();
  });
});
