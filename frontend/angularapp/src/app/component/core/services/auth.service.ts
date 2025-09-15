import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // ------------------ User & Admin Signup/Login ------------------

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // ------------------ Token Storage ------------------

  setToken(token: string, role: string): void {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  // ------------------ Authentication Checks ------------------

  isUserLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getRole();
    return !!token && role === 'USER';
  }

  isAdminLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getRole();
    return !!token && role === 'ADMIN';
  }
}
