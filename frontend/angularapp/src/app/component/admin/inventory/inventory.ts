import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InventoryItem } from '../../user/inventory/inventoryitem';
import { InventoryService } from '../../core/services/inventory.service';
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
  items: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  // Fetch inventory from backend
  loadInventory() {
    this.inventoryService.getAllItems().subscribe({
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
  // Update stock to item (updates database)
  // -------------------
updateStock(item: InventoryItem) {
  const action = prompt(`Choose action for ${item.name}: "add", "remove", "set"`)?.toLowerCase();

  if (!action || !['add', 'remove', 'set'].includes(action)) return;

  const amountStr = prompt(`Enter quantity to ${action} for ${item.name}:`);
  const amount = Number(amountStr);

  if (isNaN(amount) || amount < 0) return;

  let delta: number;

  switch(action) {
    case 'add':
      delta = amount;
      break;
    case 'remove':
      delta = -amount;
      break;
    case 'set':
      delta = amount - item.quantity; // calculate difference to reach target
      break;
    default:
      delta = 0;
  }

  // Directly call the service here
  this.inventoryService.updateStock(item.id, delta).subscribe({
    next: (updatedItem) => {
      item.quantity = updatedItem.quantity;
      this.toastMessage = `Stock for ${item.name} updated to ${item.quantity}`;
      setTimeout(() => (this.toastMessage = ''), 3000);
    },
    error: () => {
      this.toastMessage = 'Failed to update stock.';
      setTimeout(() => (this.toastMessage = ''), 3000);
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
