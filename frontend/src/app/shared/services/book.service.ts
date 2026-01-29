import { HttpClient } from "@angular/common/http";
import { Book } from "../models/book.model";
import { Injectable } from "@angular/core";
import { HttpService } from "../../core/services/http.service";

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = '/api/books';

  constructor(private http: HttpService,) { }
  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(book: any) {
    return this.http.post<Book>(this.baseUrl, book);
  }

  delete(id: number) {
    // return this.http.delete(`${this.baseUrl}/${id}`);
  }

  search(term: string) {
    return this.http.get<Book[]>(
      `/api/books/search?name=${encodeURIComponent(term)}`
    );
  }

}
