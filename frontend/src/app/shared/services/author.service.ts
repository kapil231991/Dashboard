import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private baseUrl = 'http://localhost:8081/api/authors'; // adjust if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }

  create(author: Author): Observable<Author> {
    return this.http.post<Author>(this.baseUrl, author);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
