import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class UserProfile {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+91-9876543210',
    organization: 'InvManage Ltd'
  };

  updateProfile() {
    alert('Profile updated successfully!');
  }
}
