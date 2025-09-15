import { Component, OnInit } from '@angular/core';
import { InventoryItem } from './inventoryitem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-inventory',
  templateUrl: './userinventory.html',
  styleUrls: ['./userinventory.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  standalone: true
})
export class UserInventoryComponent implements OnInit {

  searchTerm: string = '';
  selectedCategory: string = '';
  lowStockOnly: boolean = false;
  toastMessage: string = '';
  items: InventoryItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  // Fetch inventory from backend
  loadInventory() {
    this.http.get<InventoryItem[]>('http://localhost:8080/api/inventory')
      .subscribe({
        next: (data) => this.items = data,
        error: (err) => console.error('Failed to load inventory', err)
      });
  }

  // Toggle Low Stock filter
  toggleLowStock() {
    this.lowStockOnly = !this.lowStockOnly;
    if (this.lowStockOnly) {
      this.selectedCategory = ''; // reset category when low stock is selected
    }
  }

  // Filter items based on search, category, and low stock
  filteredItems() {
    return this.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? item.category === this.selectedCategory : true;
      const matchesLowStock = this.lowStockOnly ? item.quantity <= 5 : true;
      return matchesSearch && matchesCategory && matchesLowStock;
    });
  }

  // Send restock request to backend
  requestItem(item: InventoryItem) {
    this.http.post('http://localhost:8080/api/requests', {
      itemId: item.id,
      itemName: item.name
    }).subscribe({
      next: () => {
        this.toastMessage = `Request sent to admin for ${item.name}`;
        setTimeout(() => this.toastMessage = '', 3000);
      },
      error: () => {
        this.toastMessage = 'Failed to send request. Try again later.';
        setTimeout(() => this.toastMessage = '', 3000);
      }
    });
  }

  // Display stock status with quantity
  getStockStatus(item: InventoryItem): string {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= 5) return `${item.quantity} left (Low Stock)`;
    return `${item.quantity} in stock`;
  }
}
