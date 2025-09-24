import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface User {
  id?: number;
  username: string;
  password?: string;  // required only when creating
  email: string;
  phoneNumber?: string;
  fullName?: string;
  address?: string;
  role: string; // "USER" | "ADMIN"
}

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class ManageUserComponent implements OnInit {
  users: User[] = [];

  newUser: User = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    fullName: '',
    address: '',
    role: 'ADMIN'
  };

  apiUrl = 'http://localhost:8080/api/admin/users'; // adjust based on backend mapping

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Fetch all users
  loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe(data => {
      this.users = data;
    });
  }

  // Add new Admin user
  addAdmin() {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password) {
      alert("⚠️ Please fill in username, email, and password.");
      return;
    }

    this.newUser.role = 'ADMIN'; // force role as admin

    this.http.post<User>(this.apiUrl, this.newUser).subscribe(() => {
      this.newUser = {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        fullName: '',
        address: '',
        role: 'ADMIN'
      };
      this.loadUsers();
    });
  }

  // Delete user with confirmation
  deleteUser(id: number) {
    const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this user?");
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
