import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/employee/dashboard';

  constructor(private http: HttpClient) {}

  // Fetch summary stats for stat cards
  getSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary`);
  }

  // Fetch full inventory items
  getInventoryItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  // Fetch recent transactions
  getRecentTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions`);
  }

  // Fetch notifications for the dashboard
  getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`);
  }
}
