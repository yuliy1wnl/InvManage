import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RestockRequest {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  status: string;   // Pending | Approved | Rejected
  requestedAt: string;
}

@Injectable({ providedIn: 'root' })
export class RestockRequestService {
  private apiUrl = 'http://localhost:8080/api/admin/requests';

  constructor(private http: HttpClient) {}

  // ✅ Fetch all restock requests
  getRequests(): Observable<RestockRequest[]> {
    return this.http.get<RestockRequest[]>(this.apiUrl);
  }

  // ✅ Update status of a request (Approve/Reject)
  updateRequestStatus(id: number, status: string): Observable<RestockRequest> {
    return this.http.put<RestockRequest>(`${this.apiUrl}/${id}`, { status });
  }
}
