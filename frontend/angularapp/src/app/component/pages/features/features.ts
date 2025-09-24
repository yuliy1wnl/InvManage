import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-features',
  imports: [CommonModule, RouterModule],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class FeatureComponent {
  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
