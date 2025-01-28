import { Observable, map } from 'rxjs';
import { CollectionResponse } from './../../shared/collection-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from './tag.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTag(tagId: string): Observable<Tag> {
    return this.http.get<Tag>(`${environment.apiUrl}/api/tags/${tagId}`, {
      headers: {
        'accept': 'application/ld+json'
      }
    }).pipe(
      map(tag => ({
        ...tag,
        id: parseInt(tag['@id']?.split('/').pop() || '')
      }))
    );
  }

  getTags(page: number, sortField = 'id', sortDirection = 'desc'): Observable<CollectionResponse<Tag>> {
    return this.http.get<CollectionResponse<Tag>>(`${environment.apiUrl}/api/tags?page=${page}&order[${sortField}]=${sortDirection}`, {
      headers: {
        'accept': 'application/ld+json'
      }
    }).pipe(
      map(response => {
        return {
          member: response.member.map(tag => ({
            ...tag,
            id: parseInt(tag['@id']?.split('/').pop() || '')
          })),
          totalItems: response.totalItems
        };
      })
    );
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${environment.apiUrl}/api/tags`, tag, {
      headers: {
        'accept': 'application/ld+json',
        'Content-Type': 'application/ld+json'
      }
    });
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.patch<Tag>(`${environment.apiUrl}/api/tags/${tag.id}`, tag, {
      headers: {
        'accept': 'application/ld+json',
        'Content-Type': 'application/merge-patch+json'
      }
    });
  }

  removeTag(tagId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/tags/${tagId}`);
  }
}
