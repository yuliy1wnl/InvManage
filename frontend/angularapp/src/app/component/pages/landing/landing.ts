import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  appName = 'InvManage';
  tagline = 'Simplify your inventory with powerful tools.';

  features = [
    { icon: 'fa-boxes-stacked', title: 'Inventory Tracking', desc: 'Stay updated on stock levels in real-time.' },
    { icon: 'fa-file-invoice', title: 'Purchase Orders', desc: 'Create, manage and track purchase orders with ease.' },
    { icon: 'fa-users', title: 'Supplier Management', desc: 'Build strong supplier relationships with organized data.' },
    { icon: 'fa-chart-line', title: 'Smart Reports', desc: 'Get actionable insights with advanced reporting.' }
  ];

  steps = [
    { num: 1, title: 'Sign Up', desc: 'Create your free account in minutes.' },
    { num: 2, title: 'Add Products', desc: 'Easily add and manage your product catalog.' },
    { num: 3, title: 'Track & Grow', desc: 'Monitor sales, purchases, and grow your business.' }
  ];
}
