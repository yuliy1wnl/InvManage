import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

onLogin() {
  this.authService.login(this.username, this.password).subscribe({
    next: (res: any) => {
      if (res.role !== 'ADMIN') {
        alert('Access denied! Not an admin.');
        return;
      }
      // Save JWT in localStorage
      localStorage.setItem('jwt_token', res.token);
      localStorage.setItem('role', res.role);
      this.authService.setToken(res.token, res.role);
      this.router.navigate(['/admin/dashboard']);
    },
    error: () => alert('Invalid username or password')
  });
}
  goToHome() {
    this.router.navigate(['/']);
  }
}
