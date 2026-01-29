import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(`${this.baseUrl}${url}`);
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(`${this.baseUrl}${url}`, body);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.baseUrl}${url}`);
  }
}
