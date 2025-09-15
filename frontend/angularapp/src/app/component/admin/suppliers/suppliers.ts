import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Suppliers {
  suppliers: Supplier[] = [
    { id: 1, name: 'Tech Supplies Ltd', contact: '9876543210', email: 'techsupplies@gmail.com' },
    { id: 2, name: 'Office Depot', contact: '9123456780', email: 'officedepot@gmail.com' }
  ];
}
