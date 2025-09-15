import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  username: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Users {
  users: User[] = [
    { id: 1, username: 'admin1', role: 'ADMIN', email: 'admin1@gmail.com' },
    { id: 2, username: 'user1', role: 'USER', email: 'user1@gmail.com' }
  ];
}
