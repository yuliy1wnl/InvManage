import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderStatusPipe } from './order-status.pipe';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule, OrderStatusPipe],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class OrderComponent {
  // Selected filter value
  selectedStatus: string = '';
  

  // Dummy orders
  orders = [
    { id: 'ORD001', item: 'Product A', date: '2025-09-01', status: 'Delivered', total: 2500 },
    { id: 'ORD002', item: 'Product B', date: '2025-09-03', status: 'Pending', total: 1800 },
    { id: 'ORD003', item: 'Product C', date: '2025-09-05', status: 'Cancelled', total: 1200 },
    { id: 'ORD004', item: 'Product D', date: '2025-09-08', status: 'Delivered', total: 3200 },
  ];
}

