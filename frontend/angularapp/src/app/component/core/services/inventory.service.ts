// src/app/core/services/inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../../user/inventory/inventoryitem';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  getItemById(id: number): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`);
  }

  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, item);
  }

  updateItem(id: number, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  requestRestock(itemId: number, quantity: number = 1) {
  return this.http.post('http://localhost:8080/api/requests', {
    itemId,
    quantity
  });
}
  // Update stock for a specific item
  updateStock(itemId: number, delta: number): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${itemId}/add-stock`, { quantity: delta });
  }
}
