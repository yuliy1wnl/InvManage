import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PurchaseOrder {
  id: number;
  supplier: string;
  date: string;
  status: 'Pending' | 'Completed';
}

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.html',
  styleUrls: ['./purchase-orders.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PurchaseOrders {
  orders: PurchaseOrder[] = [
    { id: 101, supplier: 'Tech Supplies Ltd', date: '2025-09-01', status: 'Pending' },
    { id: 102, supplier: 'Office Depot', date: '2025-09-05', status: 'Completed' }
  ];
}
