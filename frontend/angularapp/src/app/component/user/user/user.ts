import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UserService, User } from '../../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class UserComponents implements OnInit {

  user: User | null = null;

  constructor(private userService: UserService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('Fetched user:', data);
        this.user = data;
      },
      error: (err) => console.error('Error fetching user profile:', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
