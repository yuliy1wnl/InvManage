import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RestockRequestService, RestockRequest } from '../../../service/restock-request.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './adminrequests.html',
  styleUrls: ['./adminrequests.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe]
})
export class AdminRequestsComponent implements OnInit {
  requests: RestockRequest[] = [];
  filteredRequests: RestockRequest[] = [];
  loading = true;
  statusFilter: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' = 'ALL';

  constructor(private requestService: RestockRequestService, private router: Router) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  // Load all requests from backend
  loadRequests(): void {
    this.loading = true;
    this.requestService.getRequests().subscribe({
      next: (data: RestockRequest[]) => {
        this.requests = data.sort((a,b) =>
          new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load requests', err);
        this.loading = false;
      }
    });
  }

  // Filter requests based on selected status
  applyFilter(): void {
    if (this.statusFilter === 'ALL') {
      this.filteredRequests = this.requests;
    } else {
      this.filteredRequests = this.requests.filter(r => r.status === this.statusFilter);
    }
  }

  // Change the status filter
  setFilter(status: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'): void {
    this.statusFilter = status;
    this.applyFilter();
  }

  // Approve or reject a request
  updateStatus(id: number, status: 'APPROVED' | 'REJECTED'): void {
    this.requestService.updateRequestStatus(id, status).subscribe({
      next: () => {
        // Update local array without full reload
        const req = this.requests.find(r => r.id === id);
        if (req) req.status = status;
        this.applyFilter();
      },
      error: (err) => console.error('Failed to update status', err)
    });
  }

  // Navigate to the inventory item page
  goToInventory(itemId: number): void {
    this.router.navigate(['/admin/inventory', itemId]);
  }
}
