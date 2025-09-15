import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    console.log('AdminGuard check ->', this.authService.isAdminLoggedIn());
    if (this.authService.isAdminLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin/login']); // redirect to admin login
      return false;
    }
  }
}
