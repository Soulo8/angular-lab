import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from './tag.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<{ member: Tag[] }>(`${environment.apiUrl}/api/tags`, {
      headers: {
        'accept': 'application/ld+json'
      }
    }).pipe(
      map(response => {
        return response.member.map(tag => ({
          ...tag,
          id: parseInt(tag['@id'].split('/').pop() || '', 10)
        }));
      })
    );
  }
}
