import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from '../../../service/dashboard.service';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { AdminInventoryItem } from '../inventory/inventoryitem';
import { min } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  // ------------------- Stat Cards -------------------
  totalStockItems = 0;
  lowStockItems = 0;
  pendingRestocks = 0;
  damagedItems = 0;

  // ------------------- Tables -------------------
  inventoryItems: any[] = [];
  recentTransactions: any[] = [];
  notifications: any[] = [];

  // Toast Message
  toastMessage: string = '';

  // ------------------- Chart Options -------------------
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  salesTrendChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  stockCategoryChartData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  topProductsChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };

  constructor(private dashboardService: DashboardService,
              private http: HttpClient
  ) {}

  ngOnInit(): void {
    // ------------------- Fetch Summary -------------------
    this.dashboardService.getSummary().subscribe(data => {
      this.totalStockItems = data.totalStockItems;
      this.lowStockItems = data.lowStockItems;
      this.damagedItems = data.damagedItems;
      this.pendingRestocks = data.pendingRestocks;
    });

    // ------------------- Fetch Inventory Items -------------------
    this.dashboardService.getInventoryItems().subscribe(data => {
      this.inventoryItems = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        minStock: item.minThreshold,
        price: item.unitPrice
      }));

      // Update Stock by Category Pie Chart
      const categoryMap: any = {};
      this.inventoryItems.forEach(i => categoryMap[i.category] = (categoryMap[i.category] || 0) + i.quantity);
      this.stockCategoryChartData = {
        labels: Object.keys(categoryMap),
        datasets: [{ data: Object.values(categoryMap), backgroundColor: ['#42A5F5','#66BB6A','#FFA726','#AB47BC'] }]
      };
    });

    // ------------------- Fetch Recent Transactions -------------------
    this.dashboardService.getRecentTransactions().subscribe(data => {
      this.recentTransactions = data.map((tx: any) => ({
        id: `TX-${tx.id}`,
        date: new Date(tx.transactionDate).toLocaleDateString(),
        itemName: tx.inventoryItem.name,
        quantity: tx.quantity,
        type: tx.type
      }));

      // Update Sales Trend Line Chart (last 7 days)
      const salesByDay: any = {};
      this.recentTransactions.forEach(tx => {
        if(tx.type === 'Sale') {
          salesByDay[tx.date] = (salesByDay[tx.date] || 0) + tx.quantity;
        }
      });
      this.salesTrendChartData = {
        labels: Object.keys(salesByDay),
        datasets: [{
          data: Object.values(salesByDay),
          label: 'Items Sold',
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66,165,245,0.2)',
          fill: true
        }]
      };

      // Update Top Products Bar Chart
      const productSales: any = {};
      this.recentTransactions.forEach(tx => {
        if(tx.type === 'Sale') productSales[tx.itemName] = (productSales[tx.itemName] || 0) + tx.quantity;
      });
      this.topProductsChartData = {
        labels: Object.keys(productSales),
        datasets: [{
          label: 'Units Sold',
          data: Object.values(productSales),
          backgroundColor: ['#4e54c8','#1abc9c','#f39c12','#e74c3c']
        }]
      };
    });

    // ------------------- Fetch Notifications -------------------
    this.dashboardService.getNotifications().subscribe(data => {
      this.notifications = data.map((n: any) => ({ message: n.message }));
    });
  }

 // ------------------- Action Methods -------------------

 // Add stock to item (updates backend)
  addStock(item: AdminInventoryItem) {
    const amountStr = prompt(`Enter quantity to add for ${item.name}:`);
    const amount = Number(amountStr);

    if (!isNaN(amount) && amount > 0) {
      this.http.put(`http://localhost:8080/api/inventory/${item.id}/add-stock`, { quantity: amount })
        .subscribe({
          next: (updatedItem: any) => {
            item.quantity = updatedItem.quantity; // Update UI immediately
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

  // Mark item as damaged
  markDamaged(item: AdminInventoryItem) {
    this.http.put(`http://localhost:8080/api/inventory/${item.id}/mark-damaged`, {})
      .subscribe({
        next: () => {
          this.toastMessage = `${item.name} marked as damaged.`;
          setTimeout(() => this.toastMessage = '', 3000);
        },
        error: () => {
          this.toastMessage = 'Failed to mark item as damaged.';
          setTimeout(() => this.toastMessage = '', 3000);
        }
      });
  }

  // Display stock status with quantity
  getStockStatus(item: AdminInventoryItem): string {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= 5) return `${item.quantity} left (Low Stock)`;
    return `${item.quantity} in stock`;
  }
}
