import { Component, OnInit } from '@angular/core';
import { AdminInventoryItem } from './inventoryitem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  standalone: true
})
export class AdminInventoryComponent implements OnInit {

  searchTerm: string = '';
  selectedCategory: string = '';
  lowStockOnly: boolean = false;
  toastMessage: string = '';
  items: AdminInventoryItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  // Fetch inventory from backend
  loadInventory() {
    this.http.get<AdminInventoryItem[]>('http://localhost:8080/api/inventory')
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

  // -------------------
  // Add stock to item (updates database)
  // -------------------
  addStock(item: AdminInventoryItem) {
    const amountStr = prompt(`Enter quantity to add for ${item.name}:`);
    const amount = Number(amountStr);

    if (!isNaN(amount) && amount > 0) {
      // Call backend to update stock
      this.http.put(`http://localhost:8080/api/inventory/${item.id}/add-stock`, { quantity: amount })
        .subscribe({
          next: (updatedItem: any) => {
            // Update local array to reflect changes immediately
            item.quantity = updatedItem.quantity;
            this.toastMessage = `${amount} units added to ${item.name}`;
            setTimeout(() => this.toastMessage = '', 3000);
          },
          error: () => {
            this.toastMessage = 'Failed to add stock. Try again later.';
            setTimeout(() => this.toastMessage = '', 3000);
          }
        });
    } else {
      this.toastMessage = 'Invalid quantity!';
      setTimeout(() => this.toastMessage = '', 3000);
    }
  }

  // Display stock status with quantity
  getStockStatus(item: AdminInventoryItem): string {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= 5) return `${item.quantity} left (Low Stock)`;
    return `${item.quantity} in stock`;
  }
}
