// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  avatarUrl: string; // URL of profile image
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user/profile'; // Adjust your API

  constructor(private http: HttpClient) { }
 
  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
}
