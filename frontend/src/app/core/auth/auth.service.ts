import { Injectable, signal, computed, effect } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './auth.model';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  // 🔹 Signals
  private readonly _token = signal<string | null>(null);
  private readonly _username = signal<string | null>(null);
  private readonly _firstName = signal<string | null>(null);
  private readonly _lastName = signal<string | null>(null);

  // 🔹 Computed
  readonly isLoggedIn = computed(() => !!this._token());
  readonly fullName = computed(() =>
    this._firstName() && this._lastName()
      ? `${this._firstName()} ${this._lastName()}`
      : null
  );

  constructor(private http: HttpService) {
    this.restoreFromStorage();

    // 🔥 EFFECT: persist token automatically
    effect(() => {
      const token = this._token();


      if (token) {
        localStorage.setItem(this.TOKEN_KEY, token);
      } else {
        localStorage.removeItem(this.TOKEN_KEY);
      }
    });
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('/auth/login', payload)
      .pipe(
        tap((response: LoginResponse) => this.setAuthState(response))
      );
  }

  logout(): void {
    this.clearAuthState();
  }

  getToken(): string | null {
    return this._token();
  }

  // 🔹 Internal
  private setAuthState(response: LoginResponse): void {
    this._token.set(response.token);
    this._username.set(response.username);
    this._firstName.set(response.firstName);
    this._lastName.set(response.lastName);
    localStorage.setItem('auth_user', JSON.stringify(response));
  }

  private clearAuthState(): void {
    this._token.set(null);
    this._username.set(null);
    this._firstName.set(null);
    this._lastName.set(null);
  }

  private restoreFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = localStorage.getItem('auth_user');
    if (token) {
      this._token.set(token);
    }
    if (user) {
      const userObj = JSON.parse(user);
      this._username.set(userObj.username);
      this._firstName.set(userObj.firstName);
      this._lastName.set(userObj.lastName);
    }
  }
}
