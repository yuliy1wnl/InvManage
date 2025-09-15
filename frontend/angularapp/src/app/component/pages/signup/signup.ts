import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  phone = '';
  organization = '';
  termsAccepted = false;

  constructor(private authService: AuthService, private router: Router) {}

// Signup
onSignup() {
  const user = { fullName: this.fullName, username: this.username, email: this.email, password: this.password, phone: this.phone, organization: this.organization, termsAccepted: this.termsAccepted };
  this.authService.signup(user).subscribe({
    next: () => alert('Signup successful!'),
    error: () => alert('Signup failed!')
  });
}
  
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToHome() {
  this.router.navigate(['/']);
  }

}
