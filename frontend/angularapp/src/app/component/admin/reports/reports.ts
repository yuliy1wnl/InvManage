import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Report {
  id: number;
  title: string;
  generatedOn: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Reports {
  reports: Report[] = [
    { id: 1, title: 'Monthly Sales Report', generatedOn: '2025-09-01' },
    { id: 2, title: 'Stock Summary', generatedOn: '2025-09-05' }
  ];
}
