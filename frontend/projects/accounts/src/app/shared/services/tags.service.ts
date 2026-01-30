import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tags.model';
import { HttpService } from '../../core/services/http.service';

@Injectable({ providedIn: 'root' })
export class TagService {
  private readonly baseUrl = '/tags';

  constructor(private http: HttpService) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl);
  }
}