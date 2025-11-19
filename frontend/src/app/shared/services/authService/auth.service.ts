import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, AuthState, LoginRequest, RegisterRequest } from '../../Models/auth.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../Models/user.model';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly STORAGE_KEY = 'bergen_auth';
  private authStateSubject = new BehaviorSubject<AuthState>({
      user: null,
      token: null
    });
  authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        this.authStateSubject.next({
          user: parsed.user ?? null,
          token: parsed.token ?? null
        });
      } catch {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }

  // Register
  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/register`, payload)
      .pipe(tap((res) => this.setAuth(res)));
  }

  // Login
  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/login`, payload)
      .pipe(tap((res) => this.setAuth(res)));
  }

  // Logout
  logout(): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(
        `${environment.apiUrl}/logout`,
        {},
        { headers: this.authHeaders() }
      )
      .pipe(
        tap(() => this.clearAuth())
      );
  }

  // At login or register, set the auth state
  private setAuth(response: AuthResponse) {
    this.authStateSubject.next({
      user: response.user,
      token: response.token
    });
    this.saveAuth();
  }

  // Save auth state to localStorage
  private saveAuth() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.authStateSubject.value));
  }

  // Clear auth state from localStorage
  private clearAuth() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.authStateSubject.next({ user: null, token: null });
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.authStateSubject.value.token;
  }

  // Get auth headers
  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.token ? `Bearer ${this.token}` : ''
    });
  }

  // Get current token
  get token(): string | null {
    return this.authStateSubject.value.token;
  }

  // Get current user
  get user(): User | null {
    return this.authStateSubject.value.user;
  }


}
