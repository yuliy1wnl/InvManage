import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
interface Product {
  id?: number;
  name: string;
  category: string;
  description: string;
  unitPrice: number;
  quantity: number;
  minThreshold: number;
  damaged: number;
  supplier: string;
}


@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ManageProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', category: '', description: '', unitPrice: 0, quantity: 0, minThreshold: 5, damaged: 0, supplier: '' };
  apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Fetch all products
  loadProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe(data => {
      this.products = data;
    });
  }

  // Add product
  addProduct() {
    if (!this.newProduct.name) return;
    this.http.post<Product>(this.apiUrl, this.newProduct).subscribe(() => {
      this.newProduct = { name: '', category: '', description: '', unitPrice: 0, quantity: 0, minThreshold: 5, damaged: 0, supplier: '' };
      this.loadProducts(); // refresh after adding
    });
  }

 // Delete product with SweetAlert2 confirmation
deleteProduct(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: "This will permanently delete the product.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#3498db',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.loadProducts(); // refresh after deletion
        Swal.fire('Deleted!', 'The product has been removed.', 'success');
      });
    }
  });
}
}
