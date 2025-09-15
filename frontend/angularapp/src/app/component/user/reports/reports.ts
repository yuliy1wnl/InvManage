import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class UserReports {
  reports = [
    { month: 'August 2025', orders: 5, totalSpend: 15000 },
    { month: 'July 2025', orders: 3, totalSpend: 8000 },
    { month: 'June 2025', orders: 7, totalSpend: 20000 }
  ];
}
